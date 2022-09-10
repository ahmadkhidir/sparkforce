import client from "../../app/client"

export async function fetchVolunteerOpportunities(params=null) {
    return await client.GET('volunteer_opportunity/', params)
}