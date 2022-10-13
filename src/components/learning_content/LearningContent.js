import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContainer, { LearningContentContainer } from "../product_container/ProductContainer";
import google_ic from './assets/google.png'
import { fetchLearningContent } from "./learninContentApi";

export default function LearningContent() {
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchLearningContent()
        .then(res => {setItems(res.data.results)})
    }, [])
    
    return (
        <LearningContentContainer
            title="Learning Contents"
            subTitle="Develop your professional skills and get hired by talent seekers from different Sectors all over the world."
            items={items}
            onClickMore={()=> navigate("/search")}
            underline
        />
    )
}