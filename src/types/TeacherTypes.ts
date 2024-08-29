import { Materia } from "./GeneralTypes";

export interface WordCloudResponse {
    wordcloud: string;
    palabras_mas_frecuentes: [string, number][];
}

export interface WordCloudError {
    error: string;
}

export interface ChartResponse{
    promedio_facultad: number;
    promedio_escuela: number;
    promedio_docente: number;
}

export interface ResponseError {
    error: string;
}

export interface BestWorstCommentResponse{
    mejor:{
        docente_id: number;
        materia: Materia;
        periodo: string;
        comentario: string;
        promedio: number;
    };
    peor:{
        docente_id: number;
        materia: Materia;
        periodo: string;
        comentario: string;
        promedio: number;
    };
}

export interface BestWorstCommentError{
    error: string;
}

export interface AverageGradesResponse{
    promedio: number,
    promedio_cual: number,
    promedio_cuant: number
}

export interface AverageGradesError{
    error: string;
}