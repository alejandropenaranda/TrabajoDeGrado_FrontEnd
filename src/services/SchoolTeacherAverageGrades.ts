import { API_URL } from "../auth/constants";
import { SchoolTeachersAvergaeGradesError, SchoolTeachersAvergaeGradesResponse } from "../types/DirectorTypes";

export async function getSchoolTeacherAverageGrades(token: string, id: number) {
    try {
        const res = await fetch(
            `${API_URL}/average_grades_school?escuela_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as SchoolTeachersAvergaeGradesResponse
            return json

        } else {
            const json = (await res.json()) as SchoolTeachersAvergaeGradesError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}