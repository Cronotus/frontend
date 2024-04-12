import { EventForDetail } from "../../interfaces/in/EventForDetail";
import { EventForPreview } from "../../interfaces/in/EventForPreview";
import { EventPictureForReturn } from "../../interfaces/in/EventPictureForReturn";
import { PlayerSignedUpToEventFlag } from "../../interfaces/in/PlayerSignedUpToEventFlag";
import { EventForCreationDto } from "../../interfaces/out/EventForCreationDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchDelete, fetchPost } from "../fetchWithMethod";
import useFetchWithSwr from "../useFetchWithSwr";

export const useEventPreviews = () => {
  const url = `${apiEndpoints.events}`;
  return useFetchWithSwr<EventForPreview[]>(url);
};

export const useEventDetail = (id: string) => {
  const url = `${apiEndpoints.events}/${id}`;
  return useFetchWithSwr<EventForDetail>(url);
};

export const createEventFetch = (data: EventForCreationDto) => {
  const url = `${apiEndpoints.events}`;
  return fetchPost(url, data);
};

export const deleteEventFetch = (id: string) => {
  const url = `${apiEndpoints.events}/${id}`;
  return fetchDelete(url);
};

export const useEventPictures = (eventId: string) => {
  const url = `${apiEndpoints.events}/${eventId}/pictures`;
  return useFetchWithSwr<EventPictureForReturn[]>(url);
};

export const deltePictureForEventFetch = (props: {eventId: string, pictureId: string}) => {
  const url = `${apiEndpoints.events}/${props.eventId}/picture/${props.pictureId}`;
  return fetchDelete(url);
}

export const useCheckIfPlayerIsSignedUp = (props: {eventId: string, playerId: string}) => {
  const url = `${apiEndpoints.events}/${props.eventId}/check/${props.playerId}`;
  return useFetchWithSwr<PlayerSignedUpToEventFlag>(url);
}
