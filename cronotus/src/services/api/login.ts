import { LoginCredentials } from "../../interfaces/out/LoginCredentials";
import { apiEndpoints } from "../apiEndpoints";
import { fetchPost } from "../fetchWithMethod";

export const loginFetch = (credentials: LoginCredentials) => {
  const response = fetchPost(apiEndpoints.login, credentials);
  return response;
};
