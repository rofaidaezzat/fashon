import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Languages } from "lucide-react";
import { useState } from "react";
import logo from "../assets/photo_2026-01-21_18-13-45.jpg";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import CartDrawer from "./CartDrawer";
import ImageWithFallback from "./ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const cartCount = safeCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { t, toggleLanguage, direction } = useLanguage();

  const navLinks = [
    { name: t.navbar.home, path: "/" },
    { name: t.navbar.shop, path: "/shop" },
    { name: t.navbar.about, path: "/about-us" },
    { name: t.navbar.contact, path: "/contact-us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 font-sans">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <ImageWithFallback
              src={logo}
              alt="Fashon Logo"
              className="h-16 w-16 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-[0.15em] transition-colors duration-300 uppercase relative group py-1 ${
                  isActive(link.path) ? "text-rose-600" : "text-gray-900 hover:text-rose-600"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 start-0 w-full h-0.5 bg-rose-600 transform ${direction === 'rtl' ? 'origin-right' : 'origin-left'} transition-transform duration-300 ${
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>
            ))}
          </div>
            
          {/* Desktop Actions (Cart & Language) */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleLanguage} className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Toggle Language">
              <Languages className="w-5 h-5 text-gray-900 hover:text-rose-600 transition-colors" />
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative group p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-900 group-hover:text-rose-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleLanguage} className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Toggle Language">
              <Languages className="w-5 h-5 text-gray-900 hover:text-rose-600 transition-colors" />
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative group p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-down bg-white rounded-2xl p-4 border border-gray-50 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
