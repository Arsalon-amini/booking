import React from 'react';
import {useState} from 'react'; 
import RegisterForm from '../components/RegisterForm'; 
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const[name, setName] = useState(''); 
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`http://localhost:8000/api/register`, {
                name: name, 
                email: email,
                password: password
            });
            console.log("Register User ===> ", res); 
            toast.success('Register successful'); 
        } catch (err) {
            console.log(err); 
            if(err.response.status === 400)
                toast.error(err.response.data);
        }
    };


    return(
        <>
        <div class="container-fluid  bg-secondary p-5 text-center">
            <h1>Register</h1>
        </div>

        <ToastContainer position="top-center"/>

        <div className="container">
            <div className="row">
                <div className="col-md-6" offset-md-3>
                    <RegisterForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default Register; 