
import { Ro } from "../types/Types"


export async function getRo(id: string | undefined) {
    return fetch(`/ro/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            return data
    })
}