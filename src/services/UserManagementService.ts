import { API_URL } from "../auth/constants";
import { userError, userResponse } from "../types/AdminTypes";

export async function getUsers(token: string) {
    try {
        const res = await fetch(
            `${API_URL}/list-users`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const json = (await res.json()) as userResponse
            return json

        } else {
            const json = (await res.json()) as userError
            return json
        }

    } catch (error) {
        console.log(error)
    }
}


export async function modifyUser(token: string, userId: number, body: object) {
    try {
        const res = await fetch(
            `${API_URL}/update-user/${userId}/`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),  // Asegúrate de incluir el cuerpo de la solicitud
            }
        );

        if (res.ok) {
            const json = await res.json() as userResponse;
            return json;
        } else {
            const json = await res.json() as userError;
            return json;
        }

    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Puedes lanzar el error para manejarlo en el componente
    }
}