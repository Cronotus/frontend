import useSWR, { mutate as swrMutate } from "swr";
import { swrFetcherWithHeaders } from "./swrFetcherWithHeaders";
import { useCallback } from "react";

export const useFetchWithSwrForEvents = <TData>(swrParams: string | null) => {
  const { data, error, isValidating, isLoading } = useSWR<{
    data: TData;
    paginationHeaders: string | null;
  }>(swrParams, swrFetcherWithHeaders);

  const mutate = useCallback(() => swrMutate(swrParams), [swrParams]);

  const dataContent = data?.data;
  const paginationHeaders = data?.paginationHeaders;

  return {
    data: dataContent,
    error,
    isValidating,
    isLoading,
    mutate,
    paginationHeaders,
  };
};
