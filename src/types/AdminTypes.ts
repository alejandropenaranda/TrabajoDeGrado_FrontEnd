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

export interface SchoolsAvergaeGradesItem{
    escuela: string;
    promedio_cuantitativo: number;
    promedio_cualitativo: number; 
}

export type SchoolsAvergaeGradesResponse = SchoolsAvergaeGradesItem[]

export interface SchoolsAvergaeGradesError{
    error: string;
}