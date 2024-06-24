import { apiEndpoints } from "./apiEndpoints";
import { checkForTokens } from "./provideTokens";

export const updateProfilePictureFetch = (props: {
  id: string;
  file: File;
}) => {
  const headers = new Headers();
  const { accessToken } = checkForTokens();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const formData = new FormData();
  formData.append("file", props.file, props.file.name);

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: formData,
  };

  const url: string = `${apiEndpoints.profile}/${props.id}/update-picture`;

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};
