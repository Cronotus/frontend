import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "../provideTokens";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { createOrganizerFetch } from "../api/organizer";
import { checkIfPlayer } from "./checkIfPlayer";
import { PlayerInformation } from "../../interfaces/in/PlayerInformation";
import { tokenRefreshFetch } from "../api/token";

export const getPlayerIdFromToken = (): Promise<{ playerId: string }> => {
  return new Promise((resolve, reject) => {
    const { accessToken } = checkForTokens();
    const playerIdKey = "PlayerNameIdentifier";

    const decodedToken = accessToken
      ? jwtDecode<CustomJwtPayload>(accessToken as string)
      : null;

    if (checkIfPlayer()) {
      const playerId = decodedToken?.[playerIdKey] as string;
      resolve({ playerId: playerId });
      return;
    }

    const userIdKey = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;
    const userId = decodedToken?.[userIdKey] as string;

    createOrganizerFetch({ userId: userId })
      .then((res) => res as unknown as PlayerInformation)
      .then((res) => {
        resolve({ playerId: res.id });
      })
      .then(() => {
        tokenRefreshFetch({
          accessToken: accessToken as string,
          refreshToken: localStorage.getItem("refreshToken") as string,
        });
      })
      .catch((err) => {
        console.log(err);
        console.error(
          `Could not register user as player in getPlayerIdFromToken`
        );
        reject({ playerId: "" });
      });
  });
};
