import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "../provideTokens";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";

export const checkIfPlayer = (): boolean => {
  const roleKeyName = import.meta.env.VITE_LOCAL_JWT_TOKEN_ROLES;

  const { accessToken } = checkForTokens();

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  const userRoles = decodedToken?.[roleKeyName] as string[];
  console.log(userRoles.includes("Player"));
  return userRoles.includes("Player");
};
