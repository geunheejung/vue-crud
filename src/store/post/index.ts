import { PostListType } from "@/db/createPost";
import Vuex from "vuex";
import mutations from "@/store/post/mutations";
import actions from "@/store/post/actions";

export const postState: { postList: PostListType } = {
  postList: [],
};

export type PostStateType = typeof postState;

const store = {
  state: postState,
  getters: {},
  mutations,
  actions,
  modules: {},
};

export default store;
