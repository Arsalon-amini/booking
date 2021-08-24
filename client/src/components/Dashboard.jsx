import DashboardNav from './DashboardNav'; 
import ConnectNav from './ConnectNav';
import { Link } from 'react-router-dom';
import { userHotelBookings } from '../Actions/hotel';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const Dashboard = () => {
    const { auth: { token } } = useSelector((state) => ({ ...state }))
    const [booking, setBooking] = useState([]); 

    useEffect(() => {
        loadUserBookings()
    }, [])

    const loadUserBookings = async () => {
        const res = await userHotelBookings(token);
        setBooking(res.data)
    }

    return ( 
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/' className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <pre>{JSON.stringify(booking, null, 4)}</pre>
            </div>
            
        </>
     );
}
 
export default Dashboard;

