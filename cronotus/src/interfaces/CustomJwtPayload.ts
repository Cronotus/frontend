const JWT_TOKEN_ID_KEY = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;
const JWT_TOKEN_ROLES = import.meta.env.VITE_LOCAL_JWT_TOKEN_ROLES;
const JWT_TOKEN_ORGANIZER_KEY = "OrganizerNameIdentifier";

interface CustomJwtPayloadBase {
  [key: string]: string | string[];
}

export type CustomJwtPayload = CustomJwtPayloadBase & {
  [K in typeof JWT_TOKEN_ID_KEY]: string;
} & {
  [K in typeof JWT_TOKEN_ROLES]: string[];
} & {
  [K in typeof JWT_TOKEN_ORGANIZER_KEY]?: string;
};

export interface TokenWithExpiration {
  exp: number;
}
