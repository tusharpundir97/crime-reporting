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
        const response = await fetch("http://localhost:5000/api/crimes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` }
        });

        
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
    const response = await fetch(`http://localhost:5000/api/crimes/${crimeId}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({status: newStatus})
    });
    if(response.ok){
      setCrimes(crimes.map((crime)=>(crime._id === crimeId ? {...crime, status: newStatus} : crime)))
      alert("Crime Status Updated!")
    } else {
      alert("Failed to update Status");
    }
  }

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Crime Reports</h2>
      {crimes.length === 0 ? (
        <p className="text-gray-600">No crime reports found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crimes.map((crime) => (
            <div key={crime._id} className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-300 ">
              <h3 className="text-xl font-bold">{crime.title}</h3>
              <p className="text-gray-600"><strong>Description:</strong> {crime.description}</p>
              <p className="text-gray-600"><strong>Reported By:</strong> {crime.reportedBy.name}</p>
              <p className="text-gray-700"><strong>Location:</strong> {crime.location}</p>
              <p className="text-gray-800"><strong>Status:</strong> {crime.status}</p>
              <select onChange={(e)=>updateCrimeStatus(crime._id, e.target.value)} value={crime.status}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrimeList;