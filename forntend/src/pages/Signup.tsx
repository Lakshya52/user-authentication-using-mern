import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError, APIUrl } from "../utils.js";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  // ...................................................................
  // ...................................................................

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `${APIUrl}/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      // console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  // ...................................................................
  // ...................................................................

  return (
    <>
      <h2>CREATE YOUR ACCOUNT HERE</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={signupInfo.name}
          type="text"
          name="name"
          placeholder="username"
        />{" "}
        <br />
        <input
          onChange={handleChange}
          value={signupInfo.email}
          type="email"
          name="email"
          placeholder="email"
        />{" "}
        <br />
        <input
          onChange={handleChange}
          value={signupInfo.password}
          type="password"
          name="password"
          placeholder="password"
        />{" "}
        <br />
        <button type="submit">Create My Account</button>
      </form>
      <br />
      <span>
        Already have an Account?{" "}
        <Link to="/Login" id="LoginLinkInSignup">
          Login
        </Link>
      </span>
    </>
  );
};

export default Signup;
