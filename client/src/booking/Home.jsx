import {useSelector} from 'react-redux';

const Home = () => {
    const {auth} = useSelector((state) => ({...state})) //access state from any component - using redux
    return(
        <div className="container-fluid h1 p-5 text-center">
            Home Page 
        </div>
    )
}

export default Home; 

