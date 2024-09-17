import { API_URL } from "../auth/constants";
import { uploadGradesError, uploadGradesResponse } from "../types/AdminTypes";

export async function uploadQuantitativeGrades(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file); // 'file' es el nombre del campo que se espera en el backend

    try {
        const res = await fetch(
            `${API_URL}/upload-quantitative-evaluations`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    // No agregar el "Content-Type", FormData lo hace automáticamente
                },
                body: formData, // Se envía el archivo como parte del FormData
            }
        );

        if (res.ok) {
            const json = (await res.json()) as uploadGradesResponse;
            return json;
        } else {
            const json = (await res.json()) as uploadGradesError;
            return json;
        }
    } catch (error) {
        console.log(error);
        return null; // Manejar el error correctamente si es necesario
    }
}

export async function uploadQualitativeGrades(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file); // 'file' es el nombre del campo que se espera en el backend

    try {
        const res = await fetch(
            `${API_URL}/upload-qualitative-evaluations`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    // No agregar el "Content-Type", FormData lo hace automáticamente
                },
                body: formData, // Se envía el archivo como parte del FormData
            }
        );

        if (res.ok) {
            const json = (await res.json()) as uploadGradesResponse;
            return json;
        } else {
            const json = (await res.json()) as uploadGradesError;
            return json;
        }
    } catch (error) {
        console.log(error);
        return null; // Manejar el error correctamente si es necesario
    }
}