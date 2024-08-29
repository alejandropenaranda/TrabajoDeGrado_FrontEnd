import { User } from "./GeneralTypes";

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthResponseError {
   
    error: string;
}

