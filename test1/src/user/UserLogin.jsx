// Signup.js
import React, { useState, useContext } from "react";
import LoginHook from '../hooks/userHooks/LoginHook'
import { Link } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {error,success,isLoading, UseLogin } = LoginHook();

  const handleSignIn = async (e) => {
    e.preventDefault()
    await UseLogin(email, password)
  };
 
  return (
    <div className="container register_form">
      <div className="row mt-5 justify-content-center ">
        <div className="col-md-5 my-auto shadow rounded pt-4 pb-5">
          <form onSubmit={handleSignIn}>
          <h4 className='text-center'>Login</h4>
          <p>{success?success:error}</p>

            <label htmlFor="" className="my-1">Email</label>
            <input type="email" className="my-1" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="" className="my-1">Password</label>
            <input type="password" className="my-1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn my-3" disabled={isLoading}>Signin</button>
            <p>Not a member ? <Link to='/'>Signup</Link></p>
          </form>
        </div>
        
      </div>
    </div>
  );
}
export default Signup;
