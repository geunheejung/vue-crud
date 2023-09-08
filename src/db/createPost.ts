import { v4 as uuidv4 } from "uuid";

export interface IPost {
  id: string;
  title: string;
  author: string;
  content: string;
  thumbnail_url: string;
  user_profile_url: string;
  time_ago: string;
  reviews: number;
  likes: number;
  created_at: Date;
  updated_at: Date;
}

export type PostListType = IPost[];

export type PostPayloadType = Pick<
  IPost,
  "title" | "author" | "content" | "thumbnail_url" | "user_profile_url"
>;

const createPost = (post: PostPayloadType) => {
  const newPost: IPost = {
    ...post,
    id: uuidv4(),
    reviews: 0,
    likes: 0,
    time_ago: new Date().toString(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return newPost;
};

export default createPost;
