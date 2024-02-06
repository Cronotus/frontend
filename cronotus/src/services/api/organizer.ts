import { OrganizerInformation } from "../../interfaces/in/OrganizerInformation";
import { apiEndpoints } from "../apiEndpoints";
import { fetchGet, fetchPost } from "../fetchWithMethod";
import useFetchWithSwr from "../useFetchWithSwr";

export const useOrganizer = (userId: string) => {
  const url = `${apiEndpoints.organizer}/${userId}`;
  return useFetchWithSwr<OrganizerInformation>(url);
};

export const fetchOrganizer = (userId: string) => {
  const url = `${apiEndpoints.organizer}/${userId}`;
  return fetchGet(url);
};

export const createOrganizerFetch = (data: { userId: string }) => {
  const url = `${apiEndpoints.organizer}`;
  return fetchPost(url, data);
};
