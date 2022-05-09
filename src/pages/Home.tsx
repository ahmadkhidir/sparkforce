import { ListView } from "../components/List";
import { AppBar } from "../features/AppBar";
import { Header } from "../features/Header";
import { Intro } from "../features/Intro";
import { LearningCentre } from "../features/LearningCentre";
import { Showcase } from "../features/Showcase";

export function Home(props:any) {
    return (
        <main>
            <ListView appBar={<AppBar />}>
                <Header />
                <Intro />
                <LearningCentre />
                <Showcase />
            </ListView>
        </main>
    )
}