import { TextInput, View, Pressable, StyleSheet } from "react-native"
import { useFormik } from 'formik';
import Text from "./Text";
import theme from "../theme";
import * as yup from 'yup';
import useReview from "../hooks/useReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ffffff',
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        fontSize: theme.fontSizes.body,
        padding: 10
    },
    button: {
        alignItems: "center",
        borderRadius: 8,
        padding: 15,
        backgroundColor: theme.colors.primary
    }
})

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup.number("Rating must be number").min(0, "Rating must be between 0 and 100").max(100, "Rating must be between 0 and 100").required("Rating is required"),
    text: yup.string(),
})

const ReviewForm = () => {
    const [createReview] = useReview()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values

        try {
            const { data } = await createReview({ ownerName, repositoryName, rating: Number(rating), text })
            console.log("review mutation data", data)
            navigate(`/${data.createReview.repositoryId}`)
        } catch (error) {
            console.log(error)
        }

    }

    const formik = useFormik({
        initialValues: {
            ownerName: '',
            repositoryName: '',
            rating: '',
            text: '',
        },
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.container}>
            <TextInput style={[
                styles.input,
                formik.touched.ownerName && formik.errors.ownerName && {
                    borderColor: '#d73a4a',
                },
            ]}
                placeholder='Repository owner name'
                onChangeText={formik.handleChange("ownerName")}
                value={formik.values.ownerName}
                onBlur={formik.handleBlur('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.ownerName}
                </Text>
            )}

            <TextInput style={[
                styles.input,
                formik.touched.repositoryName && formik.errors.repositoryName && {
                    borderColor: '#d73a4a',
                },
            ]}
                placeholder="Repository name"
                onChangeText={formik.handleChange("repositoryName")}
                value={formik.values.repositoryName}
                onBlur={formik.handleBlur('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.repositoryName}
                </Text>
            )}

            <TextInput style={[
                styles.input,
                formik.touched.rating && formik.errors.rating && {
                    borderColor: '#d73a4a',
                },
            ]}
                placeholder="Rating between 0 and 100"
                onChangeText={formik.handleChange("rating")}
                value={formik.values.rating}
                onBlur={formik.handleBlur('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.rating}
                </Text>
            )}

            <TextInput multiline style={[
                styles.input,
                formik.touched.review && formik.errors.review && {
                    borderColor: '#d73a4a',
                },
            ]}
                placeholder="text"
                onChangeText={formik.handleChange("text")}
                value={formik.values.text}
                onBlur={formik.handleBlur('text')}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.text}
                </Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: "#ffffff" }} fontWeight="bold" >Create a review</Text>
            </Pressable>
        </View>
    )
}

export default ReviewForm