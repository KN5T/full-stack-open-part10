import { useMutation } from "@apollo/client/react"
import { CREATE_USER } from "../graphql/mutations"

const useCreateUser = () => {
    const [mutate, result] = useMutation(CREATE_USER)

    const createUser = async ({ username, password }) => {
        const { data } = await mutate({ variables: { user: { username, password } } })

        result.data = data
        return result
    }

    return [createUser, result]
}

export default useCreateUser