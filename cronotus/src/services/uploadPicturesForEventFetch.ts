import { apiEndpoints } from "./apiEndpoints";
import { checkForTokens } from "./provideTokens";

export const uploadPicturesForEventFetch = (props: {
  eventId: string;
  files: File[];
}) => {
  const headers = new Headers();
  const { accessToken } = checkForTokens();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const formData = new FormData();
  props.files.forEach((file) => {
    formData.append("files", file, file.name);
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  const url: string = `${apiEndpoints.events}/${props.eventId}/upload-pictures`;

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};
