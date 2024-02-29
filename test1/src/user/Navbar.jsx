import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/userHooks/useAuthContext";

export default function Navbar() {
    const navigate=useNavigate()
    const {dispatch}=useAuthContext()

    const handleLogout=()=>{
        
            setTimeout(() => {
              navigate("/login")
              localStorage.removeItem('user')
            }, 10);
            dispatch({ type: "LOGOUT" });
          
    }
  return (
    <div className='container-fluid mb-0'>
      <div className="row p-0">
        <div className="col-md-12 p-0">
       <nav className="navbar navbar-expand-lg  mb-4 py-3">
  <div className="container-fluid ">
    <Link className="navbar-brand" >ShopPro</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/user/vehicle/view">Vehicles List</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " to="/user/vehicle/add">Add Vehicle</Link>
          
        </li>
        <li className="nav-item">
          <Link className="nav-link logout_btn px-3" onClick={handleLogout}>Logout</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

        </div>
      </div>
    </div>
  )
}
