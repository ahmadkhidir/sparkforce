import { ListView } from "../components/List";
import { AppBar } from "../features/AppBar";
import { Footer } from "../features/Footer";
import { Header } from "../features/Header";
import { Intro } from "../features/Intro";
import { Join } from "../features/Join";
import { LearningCentre } from "../features/LearningCentre";
import { OurTeam } from "../features/OurTeam";
import { Showcase } from "../features/Showcase";

export function Home(props:any) {
    return (
        <main>
            <ListView appBar={<AppBar />}>
                <Header />
                <Intro />
                <LearningCentre />
                <Showcase />
                <Join />
                <OurTeam />
                <Footer />
            </ListView>
        </main>
    )
}