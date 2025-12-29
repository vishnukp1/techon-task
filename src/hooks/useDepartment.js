import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://employee-react.onrender.com/emp";

export const useDepartment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: token, 
  };

  const addDepartment = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}/add-department`, data, { headers });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Add department failed");
     
    } finally {
      setLoading(false);
    }
  };

  const getDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/departments`, { headers });
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Fetch departments failed");
     
    } finally {
      setLoading(false);
    }
  };


  const deleteDepartment = async (deptId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`${BASE_URL}/delete-department/${deptId}`, { headers });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Delete department failed");
     
    } finally {
      setLoading(false);
    }
  };

  return { addDepartment, getDepartments, deleteDepartment, loading, error };
};
