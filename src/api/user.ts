import db from "@/db";
import { LoginPayloadType, UserPayloadType } from "@/db/createUser";
import customAxios, { url } from "./customAxios";

export const signup = async (user: UserPayloadType) => {
  try {
    const res = await customAxios.post(url.signUp, user);

    return res;
  } catch (error) {
    throw new Error("[ERROR-API], signup");
  }
};

export const login = async (account: LoginPayloadType) => {
  try {
    const res = await customAxios.post(url.login, account);
    return res;
  } catch (error) {
    throw new Error("[ERROR-API], login");
  }
};
