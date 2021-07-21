import { currencyFormatter } from "../Actions/stripe";
import { diffDays } from "../Actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({ h, handleHotelDelete = f => f }) => {
  const history = useHistory();

  return (
    <>
      <div className='card mb-3 m-3'>
        <div className='row no-gutters'>
          <div className='col-md-4'>
            <img
              src='https://source.unsplash.com/collection/1862377/800x600?"{2}'
              alt='Beautiful Hotel is Displayed'
              className='card-image rounded img-fluid img'
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h3 className='card-title'>
                {h.title}
                <span className='float-right m-3 text-primary'>
                  {currencyFormatter({
                    amount: h.price,
                    currency: "usd",
                  })}
                </span>
              </h3>

              <p className='alert alert-info'>{h.location}</p>
              <p className='card-text'>{`${h.content.substring(0, 200)}...`}</p>
              <p className='card-text'>
                <span className='float-right text-primary'>
                  for {diffDays(h.from, h.to)}
                  {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className='card-text'>{h.bed} beds</p>
              <p className='card-text'>
                Available From {new Date(h.from).toLocaleDateString()}
              </p>
              <div className='d-flex justify-content-between h4'>
                <button
                  className='btn btn-primary'
                  onClick={() => history.push(`/hotel/${h._id}`)}
                >
                  show more
                </button>
                <Link to={`/hotel/edit/${h._id}`}>
                  <EditOutlined />
                </Link>
                <DeleteOutlined onClick={handleHotelDelete(h._id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
