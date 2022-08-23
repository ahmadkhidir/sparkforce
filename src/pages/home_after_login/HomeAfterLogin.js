import { ListView } from "../../atoms/lists/Lists";
import { AppBarAfterLogin } from "../../components/app_bar/AppBar";
import Footer from "../../components/footer/Footer";
import { HeaderAfterLogin } from "../../components/header/Header";

export default function HomeAfterLogin() {
    return (
        <ListView appBar={<AppBarAfterLogin />}>
            <HeaderAfterLogin />
            <Footer />
        </ListView>
    )
}