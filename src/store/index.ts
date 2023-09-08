import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import postStore, { postState, PostStateType } from "@/store/post";

Vue.use(Vuex);

export interface IRootState {
  post: PostStateType;
}

const store = new Vuex.Store({
  state: {
    post: postState,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    post: postStore,
  },
});

export default store;
