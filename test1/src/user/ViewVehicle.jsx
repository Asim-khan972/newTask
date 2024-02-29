import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/userHooks/useAuthContext';

export default function ViewVehicle() {

  const [vehicles,setVehicles]=useState()
  const[loading,setLoading]=useState(null)
  const { user } = useAuthContext();

  const getVehicles=async()=>{
    setLoading(true)
    try{
const response=await fetch('/auth/user/vehicle/get',{
    headers:{
        Authorization: `Bearer ${user.token}`,
    },
    
})
const json=await response.json()
if(response.ok){
  setLoading(null)
  setVehicles(json.data)
}

    }catch(error){

    }   
  }
  useEffect(() => {
    if(user){
     getVehicles()
    }
   }, [user])
   
  return (
    <div className='container vehicle_view'>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className='table-responsive'>
          <table className="table table-hover ">
          <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">CarModel</th>
      <th scope="col">Price</th>
      <th scope="col">City</th>
      <th scope="col">NO_Of_Pics</th>
      <th scope="col">Pictures</th>
    </tr>
  </thead>
<tbody>
  {vehicles && vehicles.length>0 ? vehicles.map((vehicle,index)=>(
    <tr key={index}>
      <td>{index+1}</td>
    <td>{vehicle.carModel}</td>
      <td>{vehicle.price}</td>
      <td>{vehicle.city}</td>
      <td>{vehicle.numPictures}</td>
      <td><img src={vehicle.pictures[0]} alt="" /></td>
      {/* <td>

        {vehicle.pictures && vehicle.pictures.length>0 ? vehicle.pictures.map((picture=>(
          <img src={picture} alt="" />
        ))):"No Picture" }
      </td> */}

    </tr>
  ))
  :(
    <></>
  )
  }
</tbody>
          </table>
          </div>
       
        </div>
      </div>
    </div>
  )
}
