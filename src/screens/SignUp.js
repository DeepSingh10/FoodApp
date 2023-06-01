import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
          //save the auth toke to local storage and redirect
          localStorage.setItem('token', json.authToken)
          navigate("/login")
    
        }
        else {
          alert("Enter Valid Credentials")
        }
      }
    
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
      <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
            <div className='container text-white'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="location" className="form-control" id="exampleInputPassword2" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className='m-3 mx-1 btn btn-danger'>Already a user</Link>
                </form>
            </div>
            <div> 
              <Footer />
            </div>
        </div>
    )
}
