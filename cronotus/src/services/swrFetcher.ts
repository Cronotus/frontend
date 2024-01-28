import { checkForTokens } from "./provideTokens";

export default async function swrFetcher(
  path: string,
  query: string | undefined
) {
  const { accessToken } = checkForTokens();

  const url: string = query ? `${path}?${query}` : path;
  const fetchConfigs = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return fetch(url, fetchConfigs)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
