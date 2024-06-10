// src/services/auth.service.ts
import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ token }: { token: string }) => {
  // Set the token in the local storage
  setToLocalStorage(authKey, token);

  // Set the token in the cookie
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Set the cookie to expire in 7 days
  const cookieValue = `${authKey}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  }
  return null; // Return null if no token is found
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  // Remove the token from local storage
  localStorage.removeItem(key);

  // Remove the token from cookies by setting the expiration date to the past
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
