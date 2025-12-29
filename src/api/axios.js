import axios from "axios";

const api = axios.create({
  baseURL: "https://employee-react.onrender.com/emp",
  headers: {
    "Content-Type": "application/json",
  },
});


