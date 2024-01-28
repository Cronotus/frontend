import { TokenDto } from "../../interfaces/in/TokenDto";
import { apiEndpoints } from "../apiEndpoints";

export const tokenRefreshFetch = async (tokenDto: TokenDto) => {
  const url: string = apiEndpoints.token;
  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(tokenDto),
  };

  try {
    const response = await fetch(url, fetchOptions);
    const responseBody = await response.text();

    if (response.ok) {
      return responseBody
        ? (JSON.parse(responseBody) as TokenDto)
        : ({} as TokenDto); // pars this only if is not empty
    } else {
      throw response;
    }
  } catch (error) {
    console.log(
      `An error occured in fetchWithMethod: ${error} method: POST url: ${url} data: ${tokenDto}`
    );
    throw error;
  }
};
