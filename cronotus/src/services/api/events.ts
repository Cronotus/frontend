import { EventForDetail } from "../../interfaces/in/EventForDetail";
import { EventForPreview } from "../../interfaces/in/EventForPreview";
import { apiEndpoints } from "../apiEndpoints";
import useFetchWithSwr from "../useFetchWithSwr";

export const useEventPreviews = () => {
  const url = `${apiEndpoints.events}`;
  return useFetchWithSwr<EventForPreview[]>(url);
};

export const useEventDetail = (id: string) => {
  const url = `${apiEndpoints.events}/${id}`;
  return useFetchWithSwr<EventForDetail>(url);
};
