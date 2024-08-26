export interface WordCloudResponse {
    wordcloud: string;
    palabras_mas_frecuentes: [string, number][];
}

export interface WordCloudError {
    error: string;
}

