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
import ImageWithFallback from "./ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
               {/* Use text logo if image doesn't look good on dark bg, or tint it. 
                   Assuming the logo is the one from Navbar. Ideally should have a white version.
                   For now, let's use text or a container for the logo. */}
               <div className="bg-white p-1 rounded-full">
                  <ImageWithFallback src={logo} alt="Fashon Logo" className="h-10 w-10 object-contain rounded-full" />
               </div>
               <span className="text-2xl font-bold tracking-tight text-white">FZ DESIGNER</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
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
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">{t.footer.explore}</h3>
            <ul className="space-y-3">
              {[
                { name: t.footer.links.home, path: "/" },
                { name: t.footer.links.shop, path: "/shop" },
                { name: t.footer.links.about, path: "/about-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-rose-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                   <span className="w-0 group-hover:w-1.5 h-0.5 bg-rose-500 me-0 group-hover:me-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">{t.footer.customer_care}</h3>
            <ul className="space-y-3">
               {[
                { name: t.footer.links.cart, path: "/order" },
                { name: t.footer.links.contact, path: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-rose-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-rose-500 me-0 group-hover:me-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">{t.footer.contact_us}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>
                  {t.contact.office_address}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href={`mailto:${t.contact.email_value}`}
                  className="hover:text-white transition-colors"
                >
                  {t.contact.email_value}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href={`tel:${t.contact.phone_number}`}
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  {t.contact.phone_number}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
             <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
