import { ListView } from "../../atoms/lists/Lists";
import { AppBarAfterLogin } from "../../components/app_bar/AppBar";
import Footer from "../../components/footer/Footer";
import { HeaderAfterLogin } from "../../components/header/Header";
import LearningContent from "../../components/learning_content/LearningContent";
import VolunteerOpportunities from "../../components/volunteer_opportunities/VolunteerOpportunities";

export default function HomeAfterLogin() {
    return (
        <ListView appBar={<AppBarAfterLogin />}>
            <HeaderAfterLogin />
            <LearningContent />
            <VolunteerOpportunities />
            <Footer />
        </ListView>
    )
}