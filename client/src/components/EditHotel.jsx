import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, Select } from "antd"; 
import { useSelector } from "react-redux"; 
import { read } from '../Actions/hotel';


const { Option } = Select;

const EditHotel = ({ match }) => {
    useEffect(() => {
        loadSellerHotel();
    }, []);

    const loadSellerHotel = async() => {
        let res = await read(match.params.hotelId);
        console.log(res);
    }

    return (
      <>
        <div className='container-fluid'>
          <div className='container-fluid h2 p-5 text-center'>
            <h2>Edit Hotel</h2>
          </div>
        </div>
      </>
    );
}
 
export default EditHotel;