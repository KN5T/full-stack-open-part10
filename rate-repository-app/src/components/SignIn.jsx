import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
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
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: "#ffffff" }} fontWeight="bold" >Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;