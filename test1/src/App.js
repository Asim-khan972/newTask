import UserSignup from './user/UserSignup'
import UserLogin from './user/UserLogin'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/userHooks/useAuthContext';
import AddVehicle from "./user/AddVehicle"
import ViewVehicle from "./user/ViewVehicle"
import Navbar from "./user/Navbar"


function App() {
 
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      {user && <Navbar></Navbar>}
      <Routes>
      <Route exact path="/" element={!user ? <UserSignup></UserSignup>:<Navigate to="/user/vehicle/view" />} />
      <Route exact path="/login" element={!user ? <UserLogin ></UserLogin>:<Navigate to="/user/vehicle/view" />} />
      <Route exact path="/user/vehicle/add" element={user? <AddVehicle/> :<Navigate to="/login" />} />
      <Route exact path="/user/vehicle/view" element={user? <ViewVehicle/> :<Navigate to="/login" />} />

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
