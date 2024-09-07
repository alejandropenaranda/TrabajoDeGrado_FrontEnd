import { API_URL } from "../auth/constants";
import { TeacherRankingError, TeacherRankingResponse } from "../types/DirectorTypes";

export async function getSchoolTeacherRanking(token: string, id: number) {
    try {
        const res = await fetch(
            `${API_URL}/techer_ranking?escuela_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as TeacherRankingResponse
            return json

        } else {
            const json = (await res.json()) as TeacherRankingError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}