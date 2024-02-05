import { FetchOptions } from "../interfaces/FetchOptions";
import { checkForTokens } from "./provideTokens";

export const fetchWithMethod = async <T>(
  methodName: string,
  url: string,
  data?: T,
  contentType = "application/json",
): Promise<T> => {
  const { accessToken } = checkForTokens();

  switch (methodName) {
    case "PATCH": {
      const arrayOfPatches = (data as unknown as {
        [key: string]: string;
      }[])!.map((field: { [key: string]: string }) => {
        const [key, value] = Object.entries(field)[0];
        return {
          op: "replace",
          path: `/${key}`,
          value: value,
        };
      });

      const fetchOptions: FetchOptions = {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: methodName,
        body: JSON.stringify(arrayOfPatches),
      };

      try {
        const response = await fetch(url, fetchOptions);
        const responseBody = await response.text();

        if (response.ok) {
          return responseBody ? (JSON.parse(responseBody) as T) : ({} as T); // pars this only if is not empty
        } else {
          throw response;
        }
      } catch (error) {
        console.log(
          `An error occured in fetchWithMethod: ${error} method: ${methodName} url: ${url} data: ${data}`
        );
        throw error;
      }
    }

    case "DELETE": {
      const fetchOptions: FetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: methodName,
      };

      try {
        const response = await fetch(url, fetchOptions);

        if (response.ok) {
          return {} as T;
        } else {
          throw response;
        }
      } catch (error) {
        console.log(
          `An error occurred in fetchWithMethod: ${error} method: ${methodName} url: ${url}`
        );
        throw error;
      }
    }

    default: {
      const fetchOptions: FetchOptions = {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${accessToken}`,
        },
        method: methodName,
        body: data
          ? JSON.stringify(data, <TValue>(_key: string, value: TValue) => value)
          : null,
      };

      return fetch(url, fetchOptions).then((res) =>
        res.ok ? (res.json() as T) : Promise.reject(res)
      );
    }
  }
};

export const fetchGet = (apiEndpoint: string) =>
  fetchWithMethod("GET", apiEndpoint);

export const fetchPost = <T>(apiEndpoint: string, data: T) =>
  fetchWithMethod("POST", apiEndpoint, data);

export const fetchPut = <T>(apiEndpoint: string, data: T) =>
  fetchWithMethod("PUT", apiEndpoint, data);

export const fetchDelete = (apiEndpoint: string) =>
  fetchWithMethod("DELETE", apiEndpoint);

export const fetchPatch = <T>(apiEndpoint: string, data: T) =>
  fetchWithMethod("PATCH", apiEndpoint, data);
