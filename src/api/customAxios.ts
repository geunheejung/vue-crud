import axios from "axios";

export const url = {
  signUp: "/sign-up",
  login: "/login",
};

const customAxios = axios.create({
  baseURL: "http://localhost:3000/",
});

export default customAxios;
