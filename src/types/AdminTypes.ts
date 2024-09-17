import { User } from "./GeneralTypes";

export type userResponse = User[]

export interface userError{
    error: string;
}

export interface uploadGradesResponse{
    message: string;
}

export interface uploadGradesError{
    error: string;
}