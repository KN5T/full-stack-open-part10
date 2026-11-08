import { useApolloClient, useMutation } from "@apollo/client/react"
import { AUTHENTICATE } from "../graphql/mutations"
import useAuthStorage from '../hooks/useAuthStorage';

const useSingIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE)
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient()

    const singIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { credentials: { username, password } } })
        await authStorage.setAccessToken(data.authenticate.accessToken)
        apolloClient.resetStore()
        result.data = data
        return result
    }

    return [singIn, result]
}

export default useSingIn