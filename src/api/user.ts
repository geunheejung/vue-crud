import db from "@/db";
import { LoginPayloadType, UserPayloadType } from "@/db/createUser";

export const signup = async (user: UserPayloadType) => {
  try {
    const res = await db.users.signUp(user);

    return res;
  } catch (error) {
    throw new Error("[ERROR-API], signup");
  }
};

export const login = async (account: LoginPayloadType) => {
  try {
    const res = await db.users.login(account);
    return res;
  } catch (error) {
    throw new Error("[ERROR-API], login");
  }
};
