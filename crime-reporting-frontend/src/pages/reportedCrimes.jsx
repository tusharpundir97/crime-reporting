import { useState, useEffect } from "react";


const ReportedCrimes = () => {
const [crimes, setCrimes] = useState([]);
const token = localStorage.getItem("token");

useEffect(()=>{
      try {const fetchCrimes = async () => {
            const response = await fetch("http://localhost:5000/api/crimes/user", {
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
      }
},[])
return (
      <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Reported Crimes</h2>
            {crimes.length === 0 ? (
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


                  </div>
                  ))}
            </div>
            )}
      </div>
            )

}

export default ReportedCrimes;