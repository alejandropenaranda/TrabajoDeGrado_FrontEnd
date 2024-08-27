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