import Text from "./Text"
import { Link } from "react-router-native";

const AppBarTab = ({ name, path }) => {
    return (
        <Link to={path} >
            <Text isAppBar>{name}</Text>
        </Link >
    )
}

export default AppBarTab