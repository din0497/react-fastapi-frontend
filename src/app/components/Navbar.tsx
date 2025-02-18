import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./common/LanguageDropdown.tsx";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t("navbar.order"), path: "/order/create" },
    { name: t("navbar.clientDashboard"), path: "/client" },
    { name: t("navbar.restaurantDashboard"), path: "/restaurant/dashboard" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          {t("navbar.restaurantManager")}
        </Link>

    
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              } hover:text-green-500 transition duration-300`}
            >
              {link.name}
            </Link>
          ))}

          <LanguageDropdown />
        </div>

 
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block p-4 ${
                location.pathname === link.path
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              } hover:bg-gray-100`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
