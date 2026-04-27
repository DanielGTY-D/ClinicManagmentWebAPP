import { jwtDecode, type JwtPayload } from "jwt-decode";

export interface TokenPayload extends JwtPayload {
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  IsAssigned: string;
}

export function getTokenPayload(): TokenPayload | null {
  try {
    var token = localStorage.getItem("TOKEN");

    if (!token) return null;

    var data = jwtDecode<TokenPayload>(token);

    return data;
  } catch (error) {
    throw new Error("fallo al obtener el token");
  }
}
