// Signup.js
import React, { useState, useContext } from "react";
import SignupHook from '../hooks/userHooks/SignupHook'
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {error,success,isLoading, userSignup } = SignupHook();

  const handleSignup = async (e) => {
    e.preventDefault()
     userSignup(email, password)
  };
  const paperStyle = {
    padding: 20,
    height: "75vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <div className="container register_form">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-5 my-auto shadow rounded pt-4 pb-5">
          <form onSubmit={handleSignup}>
          <p>{success?success:error}</p>
          <h4 className="text-center">Signup</h4>
            
            <label htmlFor="" className="my-1">Email</label>
            <input type="email" className="my-1" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="" className="my-1">Password</label>
            <input type="password" className="my-1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn my-2" disabled={isLoading}>Signup</button>
            <p>Already an account ? <Link to='/login'>Signin</Link></p>

          </form>
        </div>
        
      </div>
    </div>
  );
}
export default Signup;
