import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, Select } from "antd"; 
import { useSelector } from "react-redux"; 
import { read } from '../Actions/hotel';


const { Option } = Select;

const EditHotel = ({ match }) => {
  //redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth; 
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
    const [preview, setPreview] = useState(
      "https://via.placeholder.com/100x100.png?text=PREVIEW"
    ); 
    
 //destructuring variables from state
  const { title, content, image, price, from, to, bed } = values; 
    
    const handleSubmit = async (e) => {
    //
    }
    const handleImageChange = (e) => {
      //console.log(e.target.files[0]);
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
      setPreview(`${process.env.REACT_APP_API}/hotel/image/res.data._id`)
  };

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
            Show Edit form
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