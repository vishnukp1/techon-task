import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://employee-react.onrender.com/emp";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}/register`, data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
   
    } finally {
      setLoading(false);
    }
  };


  const login = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}/login`, data);

  
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
     
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error };
};
