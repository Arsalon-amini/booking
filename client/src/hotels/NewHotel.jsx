import {useState} from 'react';
import {toast} from 'react-toastify';
import AlgoliaPlaces from 'algolia-places-react';
import {DatePicker, Select } from 'antd'; 
import moment from 'moment'; 
import {createHotel} from '../Actions/hotel';
import {useSelector} from 'react-redux'; 

const {Option} = Select; //antd design component 

const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "en",
    //countries: ["au"],
};

const NewHotel = () => {
    const { auth } = useSelector((state) => ({...state}) ); 
    const { token } = auth; 

    //State
    const [values, setValues] = useState({
        title: '',
        content: '',
        image:'',
        price: '',
        from: '',
        to: '',
        bed: ''
    });

    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW'); 
    const [location, setLocation] = useState(''); 
    const {title, content, image, price, from, to, bed} = values; 

    //event handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        // console.log(location);

        let hotelData = new FormData();
        hotelData.append('title', title); //key and value
        hotelData.append('content', content);
        hotelData.append('location', location);
        hotelData.append('price', price);
        hotelData.append('title', title);
        image && hotelData.append('image', image);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);
        console.log([...hotelData]);

        let res = await createHotel(token, hotelData);
        console.log('Hotel create res', res); 
        toast('New Hotel is Posted'); 
        setTimeout(() => {
            window.location.reload(); 
        }, 1000)
    };

    const handleImageChange = (e) => {
        //console.log(e.target.files[0]); 
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values, image: e.target.files[0]});
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const hotelForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-bloc km-2 text-left">
                    Image
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        hidden
                    />
                </label>

                <input 
                    type="text" 
                    name="title"
                    onChange={handleChange} 
                    placeholder="Title" 
                    className="form-control m-2" 
                    value={title}
                />

                <textarea
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Content" 
                    className="form-control m-2" 
                    value={content}
                />

                <AlgoliaPlaces 
                    className="form-control ml-2 mr2" 
                    placeholder="location" 
                    defaultValue={location}
                    options={config}
                    onChange={({suggestion}) => (setLocation(suggestion.value))}
                    style={{height: "50px"}}
                />

                <input 
                    type="number" 
                    name="price"
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="form-control m-2" 
                    value={price}
                />

                {/* <input 
                    type="number" 
                    name="bed"
                    onChange={handleChange} 
                    placeholder="Number of Beds" 
                    className="form-control m-2" 
                    value={bed}
                /> */}

                <Select onChange={(value) => setValues({...values, bed: value})} className="w-100 m-2" size="large" placeholder="number of beds">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>

                
            </div>
            <DatePicker 
                placeholder="From date" 
                className="form-control m-2" 
                onChange={(date, dateString) => 
                    setValues({...values, from: dateString })
                }
                
                disabledDate={(current) => 
                    current && current.valueOf() < moment().subtract(1, "days")
                }

            />

            <DatePicker 
                placeholder="To date" 
                className="form-control m-2" 
                onChange={(date, dateString) => setValues({...values, to: dateString })}

                disabledDate={(current) => 
                    current && current.valueOf() < moment().subtract(1, "days")
                }
            />

            <button className="btn btn-outline-primary m-2">Save</button>
        </form>
    )

    return (
        <>
            <div className="container-fluid h2 p-5 text-center">
                <h2>Add Hotel</h2>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br/>
                        {hotelForm()}
                    </div>
                    <div className="col-md-2">
                        <img 
                            src={preview} 
                            alt="preview_image"
                            className="img img-fluid m-2"
                        />
                         Image 
                         <pre>{JSON.stringify(values, null, 4)}</pre>
                         {JSON.stringify(location)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHotel; 