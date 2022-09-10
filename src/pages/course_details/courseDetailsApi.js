import client from "../../app/client";

export async function fetchCourseDetails(id) {
    return await client.GET(`learning_content/${id}`)
}