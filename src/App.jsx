import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Department from "./pages/Department";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/departments" element={<Department />} />
      </Routes>
    </BrowserRouter>
  );
}
