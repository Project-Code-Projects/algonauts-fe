import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  _id: string;
  studentId: string;
  type: string;
  iat: number;
  exp: number;
  instructorId:string;
}

export const decodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};
