import { jwtDecode } from "jwt-decode";
import { TokenWithExpiration } from "../interfaces/CustomJwtPayload";
import { TokenDto } from "../interfaces/in/TokenDto";
import { tokenRefreshFetch } from "./api/token";

export function checkForTokens(): {
  accessToken: string | TokenWithExpiration;
} {
  let accessToken: TokenWithExpiration | string = localStorage.getItem(
    "accessToken"
  ) as unknown as TokenWithExpiration;

  if (accessToken && isTokenValid(accessToken as unknown as string)) {
    return {
      accessToken: accessToken,
    };
  }

  const refreshToken: string = localStorage.getItem("refreshToken") as string;

  tokenRefreshFetch({
    accessToken: accessToken as unknown as string,
    refreshToken: refreshToken,
  })
    .then((tokenDto: TokenDto) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      localStorage.setItem("accessToken", tokenDto.accessToken);
      localStorage.setItem("refreshToken", tokenDto.refreshToken);
      accessToken = tokenDto.accessToken;
    })
    .catch((error) => {
      console.log(`An error occurred in fetchWithMethod: ${error}`);
      throw error;
    });

  return {
    accessToken: accessToken,
  };
}

function isTokenValid(token: string): boolean {
  const decodedToken = jwtDecode(token) as TokenWithExpiration;
  const exp = decodedToken.exp;
  console.log(exp);

  const tokenTime = new Date(exp * 1000);
  const currentTime = new Date();

  return currentTime < tokenTime;
}
