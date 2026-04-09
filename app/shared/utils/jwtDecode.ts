import {jwtDecode, type JwtPayload} from "jwt-decode";

export interface CustomPayload extends JwtPayload {
    email: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export function JWTDecode() : CustomPayload | null{
    var token = localStorage.getItem("TOKEN");

    if (!token) return null;

    var data = jwtDecode<CustomPayload>(token);

    return data;
}