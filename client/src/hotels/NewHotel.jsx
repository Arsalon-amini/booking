import {useState} from 'react';
import {toast} from 'react-toastify';
import AlgoliaPlaces from 'algolia-places-react';


const NewHotel = () => {
    //State
    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        image:'',
        price: '',
        from: '',
        to: '',
        bed: ''
    });
    const {title, content, location, image, price, from, to, bed} = values; 

    const handleSubmit = (e) => {
        //
    };

    const handleImageChange = (e) => {
        //
    };

    const handleChange = (e) => {
        //
    };

    const hotelForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-bloc km-2 text-left">Image
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange} 
                        accept="image/*" 
                        hidden
                    />
                </label>
            </div>
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
                        Image
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHotel; 