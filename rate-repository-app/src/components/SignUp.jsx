import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSingIn from '../hooks/useSingIn';
import { useNavigate } from 'react-router-native';
import useCreateUser from '../hooks/useCreateUser';

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
    username: yup.string()
        .min(5, "Username must be at least 5 characters")
        .max(30, "Username must be at most 30 characters")
        .required("Username is required"),
    password: yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    passwordConfirmation: yup.string().required("Password confirmation is required").oneOf([yup.ref("password"), null], "Passwords did not match")
})

export const SingUpContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.container}>
            <TextInput style={[
                styles.input,
                formik.touched.username && formik.errors.username && {
                    borderColor: '#d73a4a',
                },
            ]}
                placeholder='Username'
                onChangeText={formik.handleChange("username")}
                value={formik.values.username}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.username}
                </Text>
            )}

            <TextInput style={[
                styles.input,
                formik.touched.password && formik.errors.password && {
                    borderColor: '#d73a4a',
                },
            ]}
                secureTextEntry
                placeholder="Password"
                onChangeText={formik.handleChange("password")}
                value={formik.values.password}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.password}
                </Text>
            )}

            <TextInput style={[
                styles.input,
                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && {
                    borderColor: '#d73a4a',
                },
            ]}
                secureTextEntry
                placeholder='Password confirmation'
                onChangeText={formik.handleChange("passwordConfirmation")}
                value={formik.values.passwordConfirmation}
                onBlur={formik.handleBlur('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: "#d73a4a" }}>
                    {formik.errors.passwordConfirmation}
                </Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: "#ffffff" }} fontWeight="bold" >Sign up</Text>
            </Pressable>
        </View>
    )
}

const SignUp = () => {
    const [createUser] = useCreateUser()
    const [signIn] = useSingIn();
    const navige = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values

        try {
            await createUser({ username, password })
            await signIn({ username, password })
            navige("/")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <SingUpContainer onSubmit={onSubmit} />
    );
};

export default SignUp