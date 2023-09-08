import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import postStore, { postState, PostStateType } from "@/store/post";
import userStore, { userState, UserStateType } from "@/store/user";

Vue.use(Vuex);

export interface IRootState {
  post: PostStateType;
  user: UserStateType;
}

const store = new Vuex.Store({
  state: {
    post: postState,
    user: userState,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    post: postStore,
    user: userStore,
  },
});

export default store;
