import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "./provideTokens";
import { CustomJwtPayload } from "../interfaces/CustomJwtPayload";
import { createOrganizerFetch, fetchOrganizer } from "./api/organizer";
import { OrganizerInformation } from "../interfaces/in/OrganizerInformation";

export async function checkIfOrganizer(): Promise<{
  organizerId: string;
} | null> {
  const { accessToken } = checkForTokens();

  const profileIdKeyName = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;
  const profileRoleKeyName = import.meta.env.VITE_LOCAL_JWT_TOKEN_ROLES;

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  const userId = decodedToken?.[profileIdKeyName] as string;
  const roles = decodedToken?.[profileRoleKeyName] as string[];

  if (roles.includes("Organizer")) {
    try {
      const res = (await fetchOrganizer(userId)) as OrganizerInformation;
      return { organizerId: res.id };
    } catch (err) {
      console.error(`There was an error in fetchOrganizer: ${err}`);
      throw new Error(`There was an error in fetchOrganizer: ${err}`);
    }
  } else {
    try {
      await createOrganizerFetch({ userId: userId });
      const res = (await fetchOrganizer(userId)) as OrganizerInformation;
      return { organizerId: res.id };
    } catch (err) {
      console.error(`There was an error in createOrganizerFetch: ${err}`);
      throw new Error(`There was an error in createOrganizerFetch: ${err}`);
    }
  }
}
