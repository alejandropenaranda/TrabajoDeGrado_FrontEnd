import { API_URL } from "../auth/constants";
import { getSchoolsError, getSchoolsResponse } from "../types/GeneralTypes";

export async function getSchools(token: string) {
    try {
        const res = await fetch(
            `${API_URL}/schools`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as getSchoolsResponse
            return json

        } else {
            const json = (await res.json()) as getSchoolsError 
            return json
        }

    } catch (error) {
        console.log(error)
    }
}