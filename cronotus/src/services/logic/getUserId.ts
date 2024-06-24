import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "../provideTokens";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";

export const getUserId = () => {
  const { accessToken } = checkForTokens();
  const userIdKey = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  return decodedToken?.[userIdKey] as string;
};
