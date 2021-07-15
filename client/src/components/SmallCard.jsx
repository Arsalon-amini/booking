import { currencyFormatter } from '../Actions/stripe';

const SmallCard = ({ h }) => {
    return (
      <>
        <div className='card mb-3 m-3'>
          <div className='row no-gutters'>
            <div className='col-md-4'>
              <img
                src='https://via.placeholder.com/900x500.png?text=MERN+Booking'
                alt='Beautiful Hotel is Displayed'
                className='card-image rounded img-fluid img'
              />
            </div>
            <div className='col-md-8'>
              <h3 className='card-title'>
                {h.title}
                <span className='float-right m-3 text-primary'>
                  {currencyFormatter({
                    amount: h.price,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <div className='card-body'>
                <p className='alert alert-info'>{h.location}</p>
                <p className='alert'>{`${h.content.substring(1, 200)}...`}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SmallCard; 