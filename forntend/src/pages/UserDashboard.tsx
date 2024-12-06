import { APIUrl, handleError, handleSuccess } from "../utils.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwtToken"); // Get token from storage
      if (!token) {
        setError("No token found. Please log in.");
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user); // Set user data
      } catch (err) {
        setError("Authentication failed. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1>Welcome, {loggedInUser || "User"}!</h1>
      <p>Email: {user?.email || "N/A"}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserDashboard;
