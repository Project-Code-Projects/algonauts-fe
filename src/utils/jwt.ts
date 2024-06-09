import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};

/*
jwt-decode: This is used to decode JSON Web Tokens. I am sending the token in a hashed format. This decoder will read it and then decode. 

decodedToken=== This function will take the token and the decode it. 

Where is it getting the token from?---> this is getting used in auth.service.ts. It will get the token from there. 

*/
