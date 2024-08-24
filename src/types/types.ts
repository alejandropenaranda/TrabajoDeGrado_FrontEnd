export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthResponseError {
   
    error: string;
}

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