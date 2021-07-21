import { useEffect, useState } from 'react';
import { getHotels } from '../Actions/hotel';
import SmallCard from './SmallCard';

const Home = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadAllHotels();
    }, []);

    
    const loadAllHotels = async () => {
        let res = await getHotels(); 
        setHotels(res.data);
    }

    const handleHotelDelete = () => { 
        console.log('hotel deleted'); 
    }
  
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>All Hotels </h1> 
            </div>
            <div className="container-fluid">
                {hotels.map((h) =>
                    <SmallCard key={h._id} h={h} onDelete={handleHotelDelete} />)}
            </div>
        </>
    )
}

export default Home; 

