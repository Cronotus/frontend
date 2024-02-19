import { EventForPreview } from "../../interfaces/in/EventForPreview";
import { ProfileInformation } from "../../interfaces/in/ProfileInformation";
import { apiEndpoints } from "../apiEndpoints";
import { fetchDelete, fetchPatch } from "../fetchWithMethod";
import useFetchWithSwr from "../useFetchWithSwr";

export const useProfile = (id: string) => {
  const url = `${apiEndpoints.profile}/${id}`;
  return useFetchWithSwr<ProfileInformation>(url);
};

export const updateProfileFetch = (
  id: string,
  data: {
    [key: string]: string;
  }[]
) => {
  const url = `${apiEndpoints.profile}/${id}`;
  return fetchPatch(url, data);
};

export const deleteProfileFetch = (id: string) => {
  const url = `${apiEndpoints.profile}/${id}`;
  return fetchDelete(url);
};

export const useProfileEvents = (organizerId: string) => {
  const url = `${apiEndpoints.organizer}/${organizerId}/events`;
  return useFetchWithSwr<EventForPreview[]>(url);
};

export default useProfile;
