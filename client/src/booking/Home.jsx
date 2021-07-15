import { useEffect, useState } from 'react';
import { getHotels } from '../Actions/hotel';

const Home = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadAllHotels();
    }, []);

    
    const loadAllHotels = async () => {
        let res = await getHotels(); 
        setHotels(res.data);
    }
  
    return (
        <>
            <div className="container-fluid p-5 text-center">
                <h1>All Hotels </h1> 
            </div>
            <div className="container-fluid">
                <pre>{JSON.stringify(hotels, null, 4)}</pre>
            </div>
        </>
    )
}

export default Home; 

