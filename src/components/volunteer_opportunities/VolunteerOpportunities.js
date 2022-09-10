import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContainer from "../product_container/ProductContainer";
import google_ic from './assets/google.png'
import { fetchVolunteerOpportunities } from "./volunteerOpportunitiesApi";

export default function VolunteerOpportunities() {
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchVolunteerOpportunities()
        .then(res => {setItems(res.data.results)})
    }, [])

    return (
        <ProductContainer
            title="Volunteer Opportunites"
            subTitle="Browse and join volunteer projects to make a difference, and build new skills and work experience."
            items={items}
            // onClickMore={()=> navigate("/search")}
        />
    )
}