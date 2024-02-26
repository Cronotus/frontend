import { jwtDecode } from "jwt-decode";
import { checkForTokens } from "./provideTokens";
import { CustomJwtPayload } from "../interfaces/CustomJwtPayload";
import { registerAsPlayer } from "./api/player";
import { tokenRefreshFetch } from "./api/token";
import { TokenDto } from "../interfaces/in/TokenDto";

export const checkIfPlayer = (): { playerId: string } => {
  var playerId: string | null = null;
  const { accessToken } = checkForTokens();

  const userIdNameKey = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;
  const playerIdNameKey = "PlayerNameIdentifier";
  const rolesNameKey = import.meta.env.VITE_LOCAL_JWT_TOKEN_ROLES;

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  const userId = decodedToken?.[userIdNameKey] as string;
  playerId = decodedToken?.[playerIdNameKey] as string;

  if (playerId != null) return { playerId: playerId };

  registerAsPlayer(userId)
    .then((res) => res as unknown as { id: string; userId: string })
    .then((res) => {
      console.log(res);
      playerId = res.id;
    })
    .catch((err) =>
      console.error(
        `There was an error in registerAsPlayer in checkIfPlayer: ${err}`
      )
    );

  const { accessToken: newAccessToken } = checkForTokens();
  const newDecodedToken = jwtDecode<CustomJwtPayload>(newAccessToken as string);

  const roles = newDecodedToken?.[rolesNameKey] as string[];
  if (!roles.includes("Player")) {
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
      })
      .catch(() => {
        console.log(`Could not set new set of tokens`);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      });
  }

  return { playerId: playerId! };
};
