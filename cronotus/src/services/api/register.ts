import { UserForRegistrationDto } from "../../interfaces/out/UserForRegistrationDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchForAuthentication } from "../fetchForAuthentication";

export const registerFetch = (credentials: UserForRegistrationDto) => {
  const response = fetchForAuthentication(apiEndpoints.register, credentials);
  return response;
};
