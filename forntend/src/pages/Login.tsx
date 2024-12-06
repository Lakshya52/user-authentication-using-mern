import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {handleSuccess,handleError,APIUrl} from '../utils.js'

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
        return handleError('email and password are required')
    }
    try {
        const url = `${APIUrl}/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/dashboard')
            }, 1000)
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else if (!success) {
            handleError(message);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
    }
  };
  
  return (
    <>
    <h2>LOGIN HERE</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={loginInfo.email}
          type="email"
          name="email"
          placeholder="email"
        /> <br />
        <input
          onChange={handleChange}
          value={loginInfo.password}
          type="password"
          name="password"
          placeholder="password"
        /> <br /> 
        <button type="submit">Submit</button> 
      </form>
      <br />
      <span>
      Don't have a Account?{" "}
        <Link to="/signup">
          Signup
        </Link>
      </span>
    </>
  );
};

export default Login;
