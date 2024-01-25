export default async function swrFetcher(
  path: string,
  query: string | undefined
) {
  const url: string = query ? `${path}?${query}` : path;

  const token = localStorage.getItem("accessToken") as string;
  const fetchConfigs = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, fetchConfigs)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
