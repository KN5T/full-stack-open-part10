import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar.jsx'
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn.jsx';
import Repository from './Repository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import Reviews from './Reviews';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e4e8'
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/createReview" element={<ReviewForm />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/singIn" element={<SignIn />} />
                <Route path="/singUp" element={<SignUp />} />
                <Route path="/:id" element={<Repository />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;