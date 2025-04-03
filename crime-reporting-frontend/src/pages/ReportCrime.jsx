import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportCrime = () => {
  const [formData, setFormData] = useState({ title: "", description: "", location: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "https://crime-reporting-backend.onrender.com";
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/crimes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      
    });

    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
      alert("Crime reported successfully!");
      navigate('/')
    }
    else alert(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Report a Crime</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input type="text" name="title" placeholder="Crime Title" onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          <textarea name="description" placeholder="Crime Description" onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"></textarea>
          <input type="text" name="location" placeholder="Crime Location" onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
            Report Crime
          </button>
        </form>
      </div>
    </div>

  );
};

export default ReportCrime;