import { WordCloudResponse, WordCloudError } from "../types/TeacherTypes"

export async function getCuantBarChart(token: string, id: number) {
    console.log(token, id)
    try {
        const res = await fetch(
            `http://localhost:8000/core/cuant_prom?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as WordCloudResponse
            return json

        } else {
            const json = (await res.json()) as WordCloudError
            return json
        }

    } catch (error) {
        console.log(error)
    }

}

export async function getCualBarChart(token: string, id: number) {
    console.log(token, id)
    try {
        const res = await fetch(
            `http://localhost:8000/core/cual_prom?docente_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as WordCloudResponse
            return json

        } else {
            const json = (await res.json()) as WordCloudError
            return json
        }

    } catch (error) {
        console.log(error)
    }

}
