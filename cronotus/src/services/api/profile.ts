import { ProfileInformation } from "../../interfaces/in/ProfileInformation";
import { apiEndpoints } from "../apiEndpoints";
import useFetchWithSwr from "../useFetchWithSwr";

export const useProfile = (id: string) => {
  const url = `${apiEndpoints.profile}/${id}`;
  return useFetchWithSwr<ProfileInformation>(url);
};

export default useProfile;
