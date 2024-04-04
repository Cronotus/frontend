import { tokenRefreshFetch } from "../api/token";
import { checkForTokens } from "../provideTokens";

export const getNewTokens = async () => {
  const { accessToken } = checkForTokens();

  const res = await tokenRefreshFetch({
    accessToken: accessToken as string,
    refreshToken: localStorage.getItem("refreshToken") as string,
  });

  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
};
