import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
               {/* Use text logo if image doesn't look good on dark bg, or tint it. 
                   Assuming the logo is the one from Navbar. Ideally should have a white version.
                   For now, let's use text or a container for the logo. */}
               <div className="bg-white p-1 rounded-full">
                  <img src={logo} alt="Fashon Logo" className="h-10 w-10 object-contain rounded-full" />
               </div>
               <span className="text-2xl font-bold tracking-tight text-white">Fashon</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elegance is not standing out, but being remembered. Discover timeless fashion that expresses your unique style.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 p-2.5 rounded-full hover:bg-rose-600 hover:text-white text-gray-400 transition-all duration-300 hover:-translate-y-1"
                  aria-label="Social Link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-3">
              {[
                { name: "New Arrivals", path: "/shop" },
                { name: "Best Sellers", path: "/shop" },
                { name: "Clothing", path: "/shop" },
                { name: "Accessories", path: "/shop" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-rose-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                   <span className="w-0 group-hover:w-1.5 h-0.5 bg-rose-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Help & Info</h3>
            <ul className="space-y-3">
               {[
                { name: "Track Order", path: "#" },
                { name: "Returns & Exchanges", path: "#" },
                { name: "Shipping Info", path: "#" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-rose-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-rose-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>
                  123 Fashion Avenue, <br /> New Cairo, Egypt
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href="mailto:info@fashon.com"
                  className="hover:text-white transition-colors"
                >
                  info@fashon.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href="tel:+201234567890"
                  className="hover:text-white transition-colors"
                >
                  +20 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {currentYear} Rosira. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
