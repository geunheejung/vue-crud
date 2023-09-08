import createPost, { PostListType, PostPayloadType } from "@/db/createPost";

interface IResponse<T> {
  status: number;
  data: T;
}

const dbKey = {
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
  posts: {
    get postList() {
      const posts = storage.getItem<PostListType>(dbKey.posts);

      return posts || [];
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
