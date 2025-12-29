import { useEffect, useState } from "react";
import { useDepartment } from "../hooks/useDepartment";
import { Navigate } from "react-router-dom";

export default function Department() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const { addDepartment, getDepartments, deleteDepartment, loading, error } = useDepartment();

  const [form, setForm] = useState({ dept_name: "", description: "" });
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDepartment(form);
    setForm({ dept_name: "", description: "" });
    fetchDepartments();
  };

  const handleDelete = async (id) => {
    await deleteDepartment(id);
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>

      {/* Add Department */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <input
          name="dept_name"
          placeholder="Department Name"
          value={form.dept_name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Add Department
        </button>
      </form>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Department List */}
      <div className="bg-white rounded shadow">
        {loading && <p className="p-4">Loading...</p>}

        {departments.length === 0 && !loading && (
          <p className="p-4">No departments found</p>
        )}

        {departments.map((dept) => (
          <div
            key={dept._id}
            className="border-b p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{dept.department}</h3>
              <p className="text-sm text-gray-600">{dept.description}</p>
            </div>
            <button
              onClick={() => handleDelete(dept._id)}
              className="bg-red-300 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
