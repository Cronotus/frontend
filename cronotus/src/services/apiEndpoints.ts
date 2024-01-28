export const apiEndpoints = {
  login: `${import.meta.env.VITE_LOCAL_API_URL}/authentication/login`,
  register: `${import.meta.env.VITE_LOCAL_API_URL}/authentication/register`,
  profile: `${import.meta.env.VITE_LOCAL_API_URL}/profile`,
  token: `${import.meta.env.VITE_LOCAL_API_URL}/token/refresh`,
};
