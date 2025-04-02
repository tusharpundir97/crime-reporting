import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const fetchRole = async ()=>{
      const role = localStorage.getItem("role");
      if(role){
        setRole(role);
      }else{
        setRole(null);
      }

    }
    fetchRole();
  });  
  
  return (
    <div className="min-h-screen bg-gray-100">
    
      <header className="relative bg-cover bg-center h-[500px] flex items-center justify-center" 
        style={{ backgroundImage: "url('assets/crime.jpg')" }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold">
            Crime Reporting & Management System
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 mt-4 max-w-2xl">
            A secure and efficient way to report crimes and ensure justice.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {!role && <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center">
              Get Started
            </Link>}
            {role ==="citizen" && <Link to="/report-crime" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center">
              Report a Crime
            </Link>}
            {role ==="police" && <Link to="/crimes" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center">
              View Crime Reports
            </Link>}
          </div>
        </div>
      </header>

     
      <section className="py-16 px-4 md:px-10 lg:px-20 bg-white text-gray-700">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us?</h2>
          <p className="text-gray-500 mt-2">A seamless and transparent crime reporting system.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img src="assets/police.jpg" alt="Police" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Quick Response</h3>
            <p className="text-gray-500 mt-2">Get immediate attention from law enforcement.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img src="assets/security.jpg" alt="Security" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Secure & Confidential</h3>
            <p className="text-gray-500 mt-2">Your reports remain encrypted and confidential.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img src="assets/investigation.jpg" alt="Investigation" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Easy Tracking</h3>
            <p className="text-gray-500 mt-2">Track your reports anytime, anywhere.</p>
          </div>
        </div>
      </section>

      
      <section className="bg-gray-100 py-16 px-4 md:px-10 lg:px-20 text-gray-700">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold">What Our Users Say</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic text-gray-500">"This platform made reporting a crime so easy. I felt safe and heard."</p>
            <h4 className="mt-4 font-semibold text-blue-600">- Yashasvi Pundir</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic text-gray-500">"A well-structured and professional approach to crime reporting."</p>
            <h4 className="mt-4 font-semibold text-blue-600">- Rishab </h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;