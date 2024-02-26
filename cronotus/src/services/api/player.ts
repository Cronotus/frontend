import { PlayerSignedUpToEventFlag } from "../../interfaces/in/PlayerSignedUpToEventFlag";
import { apiEndpoints } from "../apiEndpoints";
import { fetchDelete, fetchPost } from "../fetchWithMethod";
import useFetchWithSwr from "../useFetchWithSwr";

export const registerAsPlayer = (userId: string) => {
  const url = `${apiEndpoints.player}`;
  const data = { userId: userId };
  return fetchPost(url, data);
};

export const registerPlayerToEvent = (eventId: string, playerId: string) => {
  const url = `${apiEndpoints.events}/${eventId}/signup/${playerId}`;
  return fetchPost(url, {});
};

export const resignPlayerFromEvent = (eventId: string, playerId: string) => {
  const url = `${apiEndpoints.events}/${eventId}/resign/${playerId}`;
  return fetchDelete(url);
};

export const useCheckPlayerRegistration = (
  eventId: string,
  playerId: string
) => {
  const url = `${apiEndpoints.events}/${eventId}/check/${playerId}`;
  return useFetchWithSwr<PlayerSignedUpToEventFlag>(url);
};
