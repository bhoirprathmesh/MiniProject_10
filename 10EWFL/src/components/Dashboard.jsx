import { useContext, useEffect, useState } from "react"
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate,NavLink } from "react-router-dom"
import {toast} from 'react-toastify';

function Dashboard() {

    const navigator = useNavigate();
    const LogoutHandler = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
      navigator("/");
      toast.success("Logout Success",{position:"top-right",autoClose: 2000});
    }
    

  return (
   
    <div className=" mt-[12vh] h-[88vh] w-full bg-white ">

      <div className=" fixed w-[20%]  h-full bg-gray-300 border-r-2 border-black flex flex-col items-center  p-5 ">

        <NavLink to={"/dashboard/"} className=" w-full p-2 bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold rounded-lg " >  Profile </NavLink> <br />
        <NavLink to={"/dashboard/myAppointments"} className=" w-full p-2 bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold rounded-lg " >  My Appointments </NavLink> <br />
        {/* <Link to={"/dashboard/myAppointments"} >  My Appointments </Link> <br /> */}
        
        <button className=" bg-red-500 w-[100px] p-2 text-white " onClick={LogoutHandler} > Log out </button>
      {/* <Link to={"addEwaste"} > Add E-waste </Link> */}

      </div>

      <div className=" ml-[20%] w-[80%] min-h-[88vh] bg-white flex justify-center items-center   ">

        <Outlet />
        
      </div>
        
    </div>
  )
}

export default Dashboard