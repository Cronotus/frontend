export const fetchForAuthentication = async <T>(url: string, data?: T) => {
  const contentType: string = "application/json";
  const methodName: string = "POST";

  const fetchOptions = {
    headers: {
      "Content-Type": contentType,
    },
    method: methodName,
    body: data
      ? JSON.stringify(data, <TValue>(_key: string, value: TValue) => value)
      : null,
  };

  try {
    const response = await fetch(url, fetchOptions);
    const responseBody = await response.text();

    if (response.ok) {
      return responseBody ? (JSON.parse(responseBody) as T) : ({} as T);
    } else {
      throw response;
    }
  } catch (error) {
    console.log(
      `An error occured in fetchForAuthentication: ${error} method: ${methodName} url: ${url} data: ${data}`
    );
    throw error;
  }
};
