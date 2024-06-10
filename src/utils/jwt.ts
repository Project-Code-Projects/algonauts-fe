import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  _id: string;
  type: string;
  iat: number;
  exp: number;
}

export const decodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};
