import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const isTokenValid = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return false;

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};
