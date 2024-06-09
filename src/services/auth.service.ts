
import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ token }: { token: string }) => {
  return setToLocalStorage(authKey, token as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

/*
getUserInfo-- I will get the decoded data from the token, for example the id and role. 
*/

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

/*
isLoggedIn-- This will return either true or false. 
I will check this time to time to see if the user is logged in or not. 
*/

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

/*
removeUserInfo- After the user has logged out, I will remove the token from the local storage
*/
