import { API_URL } from "../auth/constants";
import { AverageGradesError, AverageGradesResponse } from "../types/TeacherTypes";

export async function getAverageGrades(token: string, id: number) {
    console.log(token, id)
    try {
        const res = await fetch(
            `${API_URL}/average_grades?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as AverageGradesResponse
            return json

        } else {
            const json = (await res.json()) as AverageGradesError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}