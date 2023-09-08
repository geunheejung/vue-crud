import { UserListType, IUser } from "@/db/createUser";
import Vuex from "vuex";
import mutations from "@/store/user/mutations";
import actions from "@/store/user/actions";

export const userState: { user: IUser | null } = {
  user: null,
};

export type UserStateType = typeof userState;

const store = {
  state: userState,
  getters: {},
  mutations,
  actions: actions,
  modules: {},
};

export default store;
