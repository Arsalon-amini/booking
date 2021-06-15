import {Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({...rest}) => {
    const { auth } = useSelector((state) => ({...state})); //gives auth state slice

    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />
}

export default ProtectedRoute; 