import axios from 'axios';

export const createHotel = async(token, data) => 
    await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getHotels = async () => {
    const hotels = await axios.get(`${process.env.REACT_APP_API}/hotels`);
    return hotels;
}

export const diffDays = (from, to) => {
    //returns difference between from and two in days
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference; 
}

export const sellerHotels = async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const deleteHotel = async(token, hotelId) => {
    await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const read = async(hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
}

export const updateHotel = async (token, data, hotelId) => {
    await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}
