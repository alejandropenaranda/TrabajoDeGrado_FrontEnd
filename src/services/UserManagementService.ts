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