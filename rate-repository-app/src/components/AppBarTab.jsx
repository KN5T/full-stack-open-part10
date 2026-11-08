import Text from "./Text"
import { Link } from "react-router-native";

const AppBarTab = ({ name, path, handlePress }) => {
    return (
        <Link to={path} onPress={handlePress} >
            <Text isAppBar>{name}</Text>
        </Link >
    )
}

export default AppBarTab