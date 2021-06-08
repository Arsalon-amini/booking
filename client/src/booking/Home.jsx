import React from 'react';
import {useSelector} from 'react-redux';

const Home = () => {
    const {user} = useSelector((state) => ({...state})) //access state from any component - using redux
    return(
        <div class="container-fluid h1 p-5 text-center">
            Home Page {JSON.stringify(user)}
        </div>
    )
}

export default Home; 

