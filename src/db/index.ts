import createPost, { PostListType, PostPayloadType } from "@/db/createPost";
import createUser, {
  LoginPayloadType,
  UserListType,
  UserPayloadType,
} from "./createUser";

interface IResponse<T> {
  status: number;
  data: T;
  message?: string;
}

const dbKey = {
  users: "users",
  posts: "posts",
} as const;

type DBKeyType = keyof typeof dbKey;

const createPromise = <T>(response: IResponse<T>) => {
  return new Promise<IResponse<T>>((_resolve, _reject) => {
    setTimeout(() => {
      _resolve(response);
    }, 1000);
  });
};

const storage = {
  getItem<T>(key: DBKeyType) {
    const item = localStorage.getItem(key) as string;
    const posts = JSON.parse(item) as T;
    return posts;
  },
  setItem(key: DBKeyType, data: unknown) {
    const posts = JSON.stringify(data);
    localStorage.setItem(key, posts);
  },
};

const db = {
  getItem<T>(key: DBKeyType) {
    const list = storage.getItem(key) as T;

    return list;
  },

  users: {
    get userList() {
      return db.getItem<UserListType>(dbKey.users) || [];
    },

    login(user: LoginPayloadType) {
      /**
       * 1. email을 기준으로 유저 정보가 존재하는지 체크한다.
       * 2. 유저 정보가 존재할 경우 refresh token, accessToken을 생성한다.
       * 3. 토큰 정보와 함께 유저 정보를 같이 반환한다.
       */

      const dbUserList = db.users.userList;

      const currentUser = dbUserList.find((item) => item.email === user.email);
      if (!currentUser) {
        return createPromise({
          status: 400,
          data: null,
          message: "Account does not exist.",
        });
      }

      // const accessToken = jwt.sign(
      //   { userId: currentUser.id },
      //   "token_secret_key",
      //   {
      //     expiresIn: "5m",
      //   }
      // );

      // const refreshToken = jwt.sign(
      //   { userId: currentUser.id },
      //   "token_secret_key",
      //   {
      //     expiresIn: "10m",
      //   }
      // );

      const { email, username, id } = currentUser;

      return createPromise({
        status: 200,
        data: {
          user: { id, username, email },
          token: { accessToken: "", refreshToken: "" },
        },
      });
    },
    signUp(user: UserPayloadType) {
      const { email } = user;

      const dbUserList = db.users.userList;
      const isExists = dbUserList.find((user) => user.email === email);

      if (isExists) {
        return createPromise({
          status: 400,
          data: null,
          message: "This user already exists.",
        });
      }

      const newUser = createUser(user);

      dbUserList.push(newUser);

      storage.setItem(dbKey.users, dbUserList);

      return createPromise({
        status: 200,
        data: newUser,
      });
    },
  },
  posts: {
    get postList() {
      return db.getItem<PostListType>(dbKey.posts) || [];
    },
    setPost(post: PostPayloadType) {
      const posts = db.posts.postList;

      const newPost = createPost(post);

      posts.push(newPost);

      storage.setItem(dbKey.posts, posts);

      return createPromise<PostListType>({
        status: 200,
        data: posts,
      });
    },
    getPost(postId?: string) {
      const posts = db.posts.postList;

      const post = postId ? posts.filter((row) => row.id === postId) : posts;

      return createPromise<PostListType>({ status: 200, data: post || [] });
    },
    removePost(postId: string) {
      const posts = db.posts.postList;

      const removedPosts = posts.filter((post) => post.id !== postId);

      storage.setItem(dbKey.posts, removedPosts);
    },
  },
};

export default db;
