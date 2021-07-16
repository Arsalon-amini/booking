import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'; 
import {useHistory} from 'react-router-dom'; 

const TopNav = () => {
  const { auth } = useSelector((state) => ({...state})); //getting auth data from state for conditional rendering
  const dispatch = useDispatch(); //dispatching logout action for clearing state
  const history = useHistory(); //hook for re-directing user

  const logout = () =>{
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.removeItem('auth'); //empty local storage
    history.push('/login'); 
  }

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/"> 
        Home 
      </Link>

      {auth !== null && 
          <Link className="nav-link" to="/dashboard"> 
            Dashboard 
          </Link>
     }
     
     {auth !== null && (<a className="nav-link pointer" onClick={logout}>Logout</a>)}

     {auth === null && 
      <> 
          <Link className="nav-link" to="/login"> 
            Login 
          </Link>
          <Link className="nav-link" to="/register"> 
            Register 
          </Link>
      </>
     }

    </div>
)
  }

export default TopNav;