import { useCallback } from "react";
import useSWR, { mutate as swrMutate } from "swr";

const useFetchWithSwr = <TData>(swrParams: string | null) => {
  const { data, error, isValidating, isLoading } = useSWR<TData>(swrParams);

  const mutate = useCallback(() => swrMutate(swrParams), [swrParams]);
  return { data, error, isValidating, isLoading, mutate };
};

export default useFetchWithSwr;
