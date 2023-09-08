import { ActionContext } from "vuex";
import { UserStateType } from ".";
import { IRootState } from "..";
import { LoginPayloadType, UserPayloadType } from "@/db/createUser";
import { login, signup } from "@/api/user";

export const ACTION = {
  FETCH_SIGN_UP: "FETCH_SIGN_UP",
  FETCH_LOGIN: "FETCH_LOGIN",
} as const;

const { FETCH_SIGN_UP, FETCH_LOGIN } = ACTION;

type ContextType = ActionContext<UserStateType, IRootState>;

const actions = {
  async [FETCH_SIGN_UP](
    context: ContextType,
    payload: { type: string; user: UserPayloadType }
  ) {
    try {
      const res = await signup(payload.user);

      return res;
    } catch (error) {}
  },
  async [FETCH_LOGIN](
    context: ContextType,
    payload: { type: string; account: LoginPayloadType }
  ) {
    try {
      const res = await login(payload.account);

      const { data } = res;

      debugger;
    } catch (error) {}
  },
};

export default actions;
