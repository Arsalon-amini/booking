import { currencyFormatter } from "../Actions/stripe";
import { diffDays } from "../Actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BookingCard = ({ booking, hotel, session, orderedBy }) => {
  const history = useHistory();

  return (
    <>
      <div className='card mb-3 m-3'>
        <div className='row no-gutters'>
          <div className='col-md-4'>
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt='Beautiful Hotel is Displayed'
                className='card-image rounded img-fluid img'
              />
            ) : (
              <img
                src='https://source.unsplash.com/collection/1862377/800x600?"{2}'
                alt='Beautiful Hotel is Displayed'
                className='card-image rounded img-fluid img'
              />
            )}
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h3 className='card-title'>
                {hotel.title}
                <span className='float-right m-3 text-primary'>
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "usd",
                  })}
                </span>
              </h3>

              <p className='alert alert-info'>{hotel.location}</p>
              <p className='card-text'>{`${hotel.content.substring(0, 200)}...`}</p>
              <p className='card-text'>
                <span className='float-right text-primary'>
                  for {diffDays(hotel.from, hotel.to)}
                  {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className='card-text'>{hotel.bed} beds</p>
              <p className='card-text'>
                Available From {new Date(hotel.from).toLocaleDateString()}
              </p>
           {/*    <div className='d-flex justify-content-between h4'>
                {showViewMoreButton && (
                  <button
                    className='btn btn-primary'
                    onClick={() => history.push(`/hotel/${h._id}`)}
                  >
                    {" "}
                    show more
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
