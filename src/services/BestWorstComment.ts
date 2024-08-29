import { API_URL } from "../auth/constants";
import { BestWorstCommentError, BestWorstCommentResponse } from "../types/TeacherTypes";

export async function getBestWorstComment(token: string, id: number) {
    console.log(token, id)
    try {
        const res = await fetch(
            `${API_URL}/mejor_peor_comentario?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as BestWorstCommentResponse
            return json

        } else {
            const json = (await res.json()) as BestWorstCommentError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}