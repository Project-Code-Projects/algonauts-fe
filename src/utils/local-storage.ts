export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

/*
This setToLocalStorage is getting key and a token, then it will set the key and token to the local storage. 

For example {
  "token": "2938423908420n"
}

*/

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

/*
This function will get the key from the local storage
*/
