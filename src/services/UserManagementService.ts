import { API_URL } from "../auth/constants";
import { userError, userResponse } from "../types/AdminTypes";
import { createUserError, createUserResponse, SelfUserPasswordChangeError, SelfUserPasswordChangeResponse } from "../types/GeneralTypes";

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
                body: JSON.stringify(body),
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
        throw error;
    }
}

export async function selfModifyUserPassword(token: string, body: object) {
    try {
        const res = await fetch(
            `${API_URL}/self-change-password`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (res.ok) {
            const json = await res.json() as SelfUserPasswordChangeResponse;
            return json;
        } else {
            const json = await res.json() as SelfUserPasswordChangeError;
            return json;
        }

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}


export async function createUserService(token: string, body: object) {
    try {
        const res = await fetch(
            `${API_URL}/register`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), 
            }
        );

        if (res.ok) {
            const json = await res.json() as createUserResponse;
            return json;
        } else {
            const json = await res.json() as createUserError;
            return json;
        }

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}
