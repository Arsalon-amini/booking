import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './components/TopNav';
import ProtectedRoute from './components/ProtectedRoute'; 


//Routes
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './user/Dashboard'; 
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback'; 


function App() {

  return (
    <BrowserRouter>
    <TopNav/>
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
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
      </Switch>
    </BrowserRouter>
  );

}



export default App;


 

