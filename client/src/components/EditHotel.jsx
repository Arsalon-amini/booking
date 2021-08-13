import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, Select } from "antd"; 
import { useSelector } from "react-redux"; 
import { read, updateHotel } from '../Actions/hotel';
import HotelEditForm from './forms/HotelEditForm';


const { Option } = Select;

const EditHotel = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth; 

  const [values, setValues] = useState({
    title: "",
    content: "",
    location:"",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
      "https://via.placeholder.com/100x100.png?text=PREVIEW"
  ); 
  const [image, setImage] = useState(); 
  const [location, setLocation] = useState(""); 
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let hotelData = new FormData(); 
    hotelData.append("title", title); //key and value
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    hotelData.append("title", title);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      //console.log("Hotel Update res", res);
      toast.success(`${res.data.title} is updated!`)
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.err);
    }

    }
  const handleImageChange = (e) => {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
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

  const { title, content, price, from, to, bed } = values;

  return (
    <>
      <div className='container-fluid'>
        <div className='container-fluid h2 p-5 text-center'>
          <h2>Edit Hotel</h2>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='col-md-2'>
          <img
            src={preview}
            alt='preview text'
            className=' img img-fluid m-2'
          />
        </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
 
export default EditHotel;