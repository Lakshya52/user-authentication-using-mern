

// import UserDashboard from '../pages/UserDashboard'

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Landing = () => {



  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [navigate]);




  return (
    <>
        Hello welcome please perform a action <br />
        <Link to='/login'>LOGIN</Link> &nbsp;
        <Link to='/signup'>SIGNUP</Link>


    </>
  )
}

export default Landing