import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, Select } from "antd"; 
import { useSelector } from "react-redux"; 
import { read } from '../Actions/hotel';
import HotelEditForm from './forms/HotelEditForm';


const { Option } = Select;

const EditHotel = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth; 

  const [values, setValues] = useState({
    title: "",
    content: "",
    location:"",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
      "https://via.placeholder.com/100x100.png?text=PREVIEW"
  ); 
  const [location, setLocation] = useState(""); 
    
  const handleSubmit = async (e) => {
    //
    }
  
  const handleImageChange = (e) => {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setValues({ ...values, image: e.target.files[0] });
    };

  const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
      setValues({ ...values, ...res.data });
      setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
  };

  const { title, content, image, price, from, to, bed } = values;

  return (
    <>
      <div className='container-fluid'>
        <div className='container-fluid h2 p-5 text-center'>
          <h2>Edit Hotel</h2>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <HotelEditForm
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
              setValues={setValues}
              values={values}
            />
            <div className='col-md-2'>
              <img
                src={preview}
                alt='preview text'
                className=' img img-fluid m-2'
              />
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default EditHotel;