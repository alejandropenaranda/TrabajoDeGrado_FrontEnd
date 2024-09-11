export interface FacSchoolGradesResponse{
    promedio_facultad: number;
    promedio_facultad_cuantitativo:number;
    promedio_facultad_cualitativo:number;
    promedio_escuela: number;
    promedio_escuela_cuantitativo:number;
    promedio_escuela_cualitativo:number;
}

export interface FacSchoolGradesResponseError{
    error: string;
}


export interface  TeacherRankingItem{
    docente__id: number;
    docente__nombre: string;
    promedio_total: number;
}

export type TeacherRankingResponse = TeacherRankingItem[];


export interface TeacherRankingError{
    error: string;
}

export interface SchoolTeachersAvergaeGradesItem{
    docente: string;
    promedio_cuantitativo: number;
    promedio_cualitativo: number; 
}

export type SchoolTeachersAvergaeGradesResponse = SchoolTeachersAvergaeGradesItem[]

export interface SchoolTeachersAvergaeGradesError{
    error: string;
}

export interface SchoolFortDebResponse{
    id: number;
    escuela_id: number;
    valoraciones: {
        fortalezas:string[];
        oportunidades_mejora: string[];
    }
}

export interface SchoolFortDebError{
    error: string;
}