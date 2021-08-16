import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './components/TopNav';
import ProtectedRoute from './components/ProtectedRoute'; 


//Routes
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import DashboardSeller from './components/DashboardSeller';
import NewHotel from './components/NewHotel';
import StripeCallback from './components/StripeCallback'; 
import EditHotel from './components/EditHotel';
import ViewHotel from './components/ViewHotels';


function App() {

  return (
    <BrowserRouter>
    <TopNav/>
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register} />
        <ProtectedRoute 
          exact 
          path='/dashboard' 
          component={Dashboard}
        />
        <ProtectedRoute 
          exact 
          path='/dashboard/seller' 
          component={DashboardSeller}
        />
         <ProtectedRoute 
          exact 
          path='/hotels/new' 
          component={NewHotel}
        />
        <ProtectedRoute 
          exact 
          path='/stripe/callback' 
          component={StripeCallback}
        />
        <ProtectedRoute 
          exact 
          path='/hotel/edit/:hotelId' 
          component={EditHotel}
        />
        <Route exact path='/hotel/:hotelId' component={ViewHotel} />
      </Switch>
    </BrowserRouter>
  );

}



export default App;


 

