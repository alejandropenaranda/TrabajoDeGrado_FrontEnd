import { API_URL } from "../auth/constants";
import { SchoolFortDebError, SchoolFortDebResponse } from "../types/DirectorTypes";
import { CualFortDebResponse, FortDebError, FortDebResponse } from "../types/TeacherTypes";

export async function getCuantFortDeb(token: string, id: number) {
    try {
        const res = await fetch(
            `${API_URL}/cuant_fort_deb?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as FortDebResponse
            return json

        } else {
            const json = (await res.json()) as FortDebError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getCualFortDeb(token: string, id: number) {
    try {
        const res = await fetch(
            `${API_URL}/cual_fort_deb?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as CualFortDebResponse
            return json

        } else {
            const json = (await res.json()) as FortDebError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getSchoolFortDeb(token: string, id: number) {
    try {
        const res = await fetch(
            `${API_URL}/school_fort_deb?escuela_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as SchoolFortDebResponse
            return json

        } else {
            const json = (await res.json()) as SchoolFortDebError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}