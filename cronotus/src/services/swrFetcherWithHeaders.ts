import { checkForTokens } from "./provideTokens";

export const swrFetcherWithHeaders = async (url: string) => {
  const { accessToken } = checkForTokens();
  const fetchConfigs = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(url, fetchConfigs);
  const data = await response.json();
  const paginationHeaders = response.headers.get("X-Pagination");
  return { data, paginationHeaders };
};
