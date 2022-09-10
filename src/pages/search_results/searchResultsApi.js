import client from "../../app/client"

export async function fetchLearningContent(params=null) {
    return await client.GET('learning_content/', params)
}