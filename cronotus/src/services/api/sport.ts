import { Sport } from "../../interfaces/in/Sport";
import { apiEndpoints } from "../apiEndpoints";
import useFetchWithSwr from "../useFetchWithSwr";

export const useSports = () => {
  const url = `${apiEndpoints.sport}`;
  return useFetchWithSwr<Sport[]>(url);
};

export const useSport = (id: string) => {
  const url = `${apiEndpoints.sport}/${id}`;
  return useFetchWithSwr<Sport>(url);
};
