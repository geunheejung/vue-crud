import { PostListType } from "@/db/createPost";
import { PostStateType } from "@/store/post";

export const MUTATION = {
  SET_POST_LIST: "SET_POST_LIST",
};

const mutations = {
  [MUTATION.SET_POST_LIST](
    state: PostStateType,
    payload: { data: PostListType }
  ) {
    state.postList = payload.data;
  },
};

export default mutations;
