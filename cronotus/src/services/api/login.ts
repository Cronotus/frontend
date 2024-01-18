import { LoginCredentialsDto } from "../../interfaces/out/LoginCredentialsDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchPost } from "../fetchWithMethod";

export const loginFetch = (credentials: LoginCredentialsDto) => {
  const response = fetchPost(apiEndpoints.login, credentials);
  return response;
};
