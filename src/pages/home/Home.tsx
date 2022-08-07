import { ListView } from "../../components/List";
import AppBar from "../../features/app_bar/AppBar";
import Footer from "../../features/footer/Footer";
import Header from "../../features/header/Header";
import Intro from "../../features/intro/Intro";
import Join from "../../features/join/Join";
import LearningCentre from "../../features/learning_centre/LearningCentre";
import OurTeam from "../../features/our_team/OurTeam";
import Showcase from "../../features/showcase/Showcase";
import Testimonials from "../../features/testimonials/Testimonials";

export function Home(props:any) {
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