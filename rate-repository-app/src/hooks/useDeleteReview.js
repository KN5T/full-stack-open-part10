
import { useMutation } from "@apollo/client/react"
import { DELETE_REVIEW } from "../graphql/mutations"

const useDeleteReview = () => {
    const [mutate] = useMutation(DELETE_REVIEW)

    const deleteReview = (reviewId) => {
        mutate({ variables: { deleteReviewId: reviewId } })
    }

    return [deleteReview]
}

export default useDeleteReview