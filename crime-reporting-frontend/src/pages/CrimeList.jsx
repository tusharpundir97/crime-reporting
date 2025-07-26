import { useState, useEffect } from "react";

const CrimeList = () => {
  const [crimes, setCrimes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token){
          throw new Error("No authentication token found. Please log in.")
        }
        setLoading(true);
        const response = await fetch("https://crime-reporting-backend.onrender.com", {
          method: "GET",
          headers: {
            
            Authorization: `Bearer ${token}` }
        });

        console.log(response);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch crimes");
        }

        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setCrimes(data);
          
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const updateCrimeStatus = async (crimeId, newStatus) => {
    const token = localStorage.getItem("token");
    const API_URL = "https://crime-reporting-backend.onrender.com";
    
    const response = await fetch(`${API_URL}/api/crimes/${crimeId}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({status: newStatus})
    });
    console.log(response);
    
    if(response.ok){
      setCrimes(crimes.map((crime)=>(crime._id === crimeId ? {...crime, status: newStatus} : crime)))
      alert("Crime Status Updated!")
    } else {
      alert("Failed to update Status");
    }
  }

  

  // if (loading) return <p className="flex justify-center align-middle">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-5xl font-bold mb-4 ">Crime Reports</h2>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-svh"
        
        >
          <svg
            className="animate-spin h-50 w-50 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-center text-gray-600 mt-2">Fetching reports...</p>
        </div>
      ): (crimes.length === 0 ? (
        <p className="text-gray-600">No crime reports found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crimes.map((crime) => (
            <div key={crime._id} className="bg-white p-4 shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto transition transform  hover:bg-gray-300 hover:scale-105  mt-2">
              <h3 className="text-xl font-bold">{crime.title}</h3>
              <p className="text-gray-600"><strong>Description:</strong> {crime.description}</p>
              <p className="text-gray-600 mt-2"><strong>Reported By:</strong> {crime.reportedBy.name}</p>
              <p className="text-sm mt-1 text-gray-700"><strong>Location:</strong> {crime.location}</p>
              <p className="text-gray-800"><strong>Status:</strong> {crime.status}</p>
               
              <select onChange={(e)=>updateCrimeStatus(crime._id, e.target.value)} value={crime.status}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              {crime.image && (
                        <img
                        src={`${crime.image}`}
                        alt="Crime Image"
                        className="w-full h-64 overflow-hidden"
                        />
                  )}
            </div>
          ))}
        </div>
      ))
    }
    </div>
  );
};

export default CrimeList;