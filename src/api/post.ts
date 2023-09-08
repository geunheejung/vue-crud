import db from "@/db";
import { PostPayloadType } from "@/db/createPost";

export const getPostList = async () => {
  try {
    const res = await db.posts.getPost();

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("[ERROR-API], getPostList");
  }
};

export const setPost = async (payload: PostPayloadType) => {
  try {
    const res = await db.posts.setPost(payload);

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("[ERROR-API], setPost");
  }
};
