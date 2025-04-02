import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-white">About Us</h2>
            <p className="mt-2 text-sm text-gray-400">
              Crime Reporting & Management System helps ensure justice by providing a secure platform for crime reporting.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/report-crime" className="hover:text-blue-400">Report Crime</Link></li>
              <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <p className="mt-2 text-sm text-gray-400">Email: support@crimereport.com</p>
            <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center border-t border-gray-700 mt-6 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Crime Reporting System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;