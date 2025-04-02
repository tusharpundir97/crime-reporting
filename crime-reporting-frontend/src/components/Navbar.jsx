import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }
  

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Crime Reportage
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {role === "citizen" && <Link to="/report-crime" className="text-gray-700 hover:text-blue-600 ">Report Crime</Link>}
            {role === "citizen" && <Link to="/user" className="text-gray-700 hover:text-blue-600 ">Reported Crimes</Link>}
            {role === "police" && <Link to="/crimes" className="text-gray-700 hover:text-blue-600">Crime Reports</Link>}
            {!role && <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>}
            {!role && <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >Sign Up </Link>}          
            {role && <button className=" px-4 py-2 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700" onClick={handleLogout}>Logout</button>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 py-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-4 py-2">Home</Link>
            {role ==="citizen" && <Link to="/report-crime" className="text-gray-700 hover:text-blue-600 px-4 py-2">Report Crime</Link>}
            {role ==="citizen" && <Link to="/user" className="text-gray-700 hover:text-blue-600 px-4 py-2">Reported Crimes</Link>}
            {role ==="police" && <Link to="/crimes" className="text-gray-700 hover:text-blue-600 px-4 py-2">Crime Reports</Link>}
            {!role && <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2">Login</Link>}
            {!role && <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-4">
              Sign Up
            </Link>}
            {role && <button  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mx-4" onClick={handleLogout}>Logout
            </button>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;