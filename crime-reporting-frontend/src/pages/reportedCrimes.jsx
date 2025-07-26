import { useState, useEffect } from "react";


const ReportedCrimes = () => {
const [crimes, setCrimes] = useState([]);
const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");

useEffect(()=>{
      const API_URL = "http://localhost:5000";
      // const API_URL = "https://crime-reporting-backend.onrender.com";
      try {
            setLoading(true);
            const fetchCrimes = async () => {
            const response = await fetch(`${API_URL}/api/crimes/user`, {
                  headers: {Authorization: `Bearer ${token}`},
            });
            if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(errorText || "Failed to fetch crimes");
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                  setCrimes(data);
                } else {
                  throw new Error("Unexpected API response format");
                }
            
      };
      fetchCrimes();}
      catch (error) {
            console.error(error);           
      }finally{
            setLoading(false)
      }
},[])
return (
      <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Reported Crimes</h2>
            {loading ? (
        <div className="flex flex-col justify-center items-center h-svh">
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
            ):
            (crimes.length === 0 ? (
            <p className="text-gray-600">No crime reports found</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crimes.map((crime) => (
                  <div key={crime._id} className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-300 ">
                  <h3 className="text-xl font-bold">{crime.title}</h3>
                  <p className="text-gray-600">{crime.description}</p>
                  {/* <p className="text-sm text-gray-500 mt-2">Reported by: {crime.reportedBy.email}</p> */}
                  <p className="text-sm text-gray-800 "><strong>Location:</strong> {crime.location}</p>
                  <p className="text-gray-800"><strong>Status:</strong> {crime.status}</p>
                  {crime.image && (
                        <img
                        src={`${crime.image}`}
                        alt="Crime Image"
                        className=""
                        />
                  )}


                  </div>
                  ))}
            </div>
            ))
            }
      </div>
            )

}

export default ReportedCrimes;