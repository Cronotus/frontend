import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { checkForTokens } from "../provideTokens";

export const getOrganizerId = (): string => {
  const { accessToken } = checkForTokens();
  const organizerIdKey = "OrganizerNameIdentifier";

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  return decodedToken?.[organizerIdKey] as string;
};
