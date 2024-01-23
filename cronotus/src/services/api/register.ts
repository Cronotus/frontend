import { UserForRegistrationDto } from "../../interfaces/out/UserForRegistrationDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchPost } from "../fetchWithMethod";

export const registerFetch = (credentials: UserForRegistrationDto) => {
  const response = fetchPost(apiEndpoints.register, credentials);
  return response;
};
