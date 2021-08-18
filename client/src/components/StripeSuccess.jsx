import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const StripeSuccess = ({ match }) => {
    const { auth: { token } } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        console.log("send to backend", match.params.hotelId)
        
    }, [match.params.hotelId]);

    return (
      <div className='container'>
        <div className='col'>
                <h2 className='text-center p-5'>
                    Payment Success! You just got paid!
                     {match.params.hotelId}
                    </h2>
        </div>
      </div>
    );
}
 
export default StripeSuccess;