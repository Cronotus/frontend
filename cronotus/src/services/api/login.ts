import { LoginCredentialsDto } from "../../interfaces/out/LoginCredentialsDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchForAuthentication } from "../fetchForAuthentication";

export const loginFetch = (credentials: LoginCredentialsDto) => {
  const response = fetchForAuthentication(apiEndpoints.login, credentials);
  return response;
};
