import client from "../../app/client";

export async function fetchUserInfo() {
    return await client.GET('user_information/')
}