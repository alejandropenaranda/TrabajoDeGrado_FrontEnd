export interface User {
    id: number;
    nombre: string;
    email: string;
    codigo: string;
    is_admin: boolean;
    is_director: boolean;
    is_profesor: boolean;
    escuela: Escuela;
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
