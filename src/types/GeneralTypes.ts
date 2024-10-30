export interface User {
    id: number;
    nombre: string;
    email: string;
    codigo: string;
    is_admin: boolean;
    is_director: boolean;
    is_profesor: boolean;
    is_active:boolean;
    escuela: Escuela;
    password?: string; 
}

export interface createUser {
    nombre: string;
    email: string;
    codigo: string;
    password: string; 
    is_admin: boolean;
    is_director: boolean;
    is_profesor: boolean;
    escuela_id?: number;
}

export interface Escuela {
    id: number;
    nombre: string;
}

export interface Materia {
    id: number;
    codigo: string;
    nombre: string;
}

export interface ColumnConfig {
    headerName: string;
    fieldName: string;
}


export interface SelfUserPasswordChangeResponse {
    message: string;
}

export interface SelfUserPasswordChangeError {
    error: string;
}


export type getSchoolsResponse = Escuela[]


export interface getSchoolsError  {
    error: string;
}


export interface createUserResponse{
    user: User;
}

export interface createUserError {
    error: string;
}
