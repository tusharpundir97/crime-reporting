import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportCrime = () => {
  const [formData, setFormData] = useState({ title: "", description: "", location: "",image: null });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files?files[0]:value
    }));
  };
  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const API_URL = "https://crime-reporting-backend.onrender.com";
    const API_URL = "http://localhost:5000";
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('image', formData.image);
    if(formData.image.size > 2*1024*1024){
      alert("Image is too large .Max 2MB allowed");
    }
    try {
      const response = await fetch(`${API_URL}/api/crimes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        
      });
      const result = await response.json();
      alert('Crime Reported Successfully!!')
      navigate('/')
      console.log(result);
      
    } catch (error) {
      console.log('Error Reporting Crime:',error);
      
    }

    // const data = await response.json();
    // console.log(data);
    
    // if (response.ok) {
    //   alert("Crime reported successfully!");
      
    // }
    // else alert(data.message);
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
          <input type="file" name="image" placeholder="Crime Image" accept="image/*" onChange={handleChange} required
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