import { ListView } from "../../atoms/List";
import AppBar from "../../components/app_bar/AppBar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Intro from "../../components/intro/Intro";
import Join from "../../components/join/Join";
import LearningCentre from "../../components/learning_centre/LearningCentre";
import OurTeam from "../../components/our_team/OurTeam";
import Showcase from "../../components/showcase/Showcase";
import Testimonials from "../../components/testimonials/Testimonials";

export default function Home(props:any) {
    return (
        <ListView appBar={<AppBar />}>
            <Header />
            <Intro />
            <LearningCentre />
            <Showcase />
            <Join />
            <OurTeam />
            <Testimonials />
            <Footer />
        </ListView>
    )
}