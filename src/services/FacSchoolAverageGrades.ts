import { API_URL } from "../auth/constants";
import { FacSchoolGradesResponse, FacSchoolGradesResponseError } from "../types/DirectorTypes";

export async function getFacSchoolAverageGrades(token: string, id: number) {
    console.log(token, id)
    try {
        const res = await fetch(
            `${API_URL}/prom_fac_escuela?escuela_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as FacSchoolGradesResponse
            return json

        } else {
            const json = (await res.json()) as FacSchoolGradesResponseError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}