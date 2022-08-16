import { ListView } from "../../atoms/lists/Lists";
import { AppBarAfterLogin } from "../../components/app_bar/AppBar";

export default function HomeAfterLogin() {
    return (
        <ListView appBar={<AppBarAfterLogin />}>
        </ListView>
    )
}