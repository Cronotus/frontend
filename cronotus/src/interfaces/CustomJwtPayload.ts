const JWT_TOKEN_ID_KEY = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;

interface CustomJwtPayloadBase {
  [key: string]: string;
}

export type CustomJwtPayload = CustomJwtPayloadBase & {
  [K in typeof JWT_TOKEN_ID_KEY]: string;
};
