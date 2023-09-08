import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type UserListType = Array<IUser>;

export type UserPayloadType = Pick<IUser, "email" | "password" | "username">;

export type LoginPayloadType = Pick<IUser, "email" | "password">;

const createUser = (user: UserPayloadType) => {
  const newUser: IUser = {
    ...user,
    id: uuidv4(),
  };

  return newUser;
};

export default createUser;
