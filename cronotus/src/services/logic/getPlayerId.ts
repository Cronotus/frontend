import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "../provideTokens";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";

export const getPlayerId = () => {
  const { accessToken } = checkForTokens();
  const playerIdKey = "PlayerNameIdentifier";

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  return decodedToken?.[playerIdKey] as string;
};
