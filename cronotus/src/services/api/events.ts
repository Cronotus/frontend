import { EventForDetail } from "../../interfaces/in/EventForDetail";
import { EventForPreview } from "../../interfaces/in/EventForPreview";
import { EventForCreationDto } from "../../interfaces/out/EventForCreationDto";
import { apiEndpoints } from "../apiEndpoints";
import { fetchPost } from "../fetchWithMethod";
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
