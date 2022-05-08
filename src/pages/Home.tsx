import { ListView } from "../components/ListView";
import { AppBar } from "../features/AppBar";
import { Header } from "../features/Header";
import { Intro } from "../features/Intro";
import { LearningCentre } from "../features/LearningCentre";

export function Home(props:any) {
    return (
        <main>
            <ListView appBar={<AppBar />}>
                <Header />
                <Intro />
                <LearningCentre />
            </ListView>
        </main>
    )
}