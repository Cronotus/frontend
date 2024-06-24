import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "../provideTokens";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { checkIfOrganizer } from "./checkIfOrganizer";
import { createOrganizerFetch } from "../api/organizer";
import { OrganizerInformation } from "../../interfaces/in/OrganizerInformation";

export const getOrganizerIdFromToken = (): Promise<{ organizerId: string }> => {
  return new Promise((resolve, reject) => {
    const { accessToken } = checkForTokens();
    const OrganizerIdKey = "OrganizerNameIdentifier";

    const decodedToken = accessToken
      ? jwtDecode<CustomJwtPayload>(accessToken as string)
      : null;

    if (checkIfOrganizer()) {
      const organizerId = decodedToken?.[OrganizerIdKey] as string;
      resolve({ organizerId: organizerId });
      return;
    }

    const userIdKey = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;
    const userId = decodedToken?.[userIdKey] as string;

    createOrganizerFetch({ userId: userId })
      .then((res) => res as unknown as OrganizerInformation)
      .then((res) => {
        resolve({ organizerId: res.id });
      })
      .catch((err) => {
        console.error(
          `Could not register user as organizer in getOrganizerIdFromToken`
        );
        console.error(err);
        reject({ organizerId: "" });
      });
  });
};
