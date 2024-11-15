import { useState } from "react";
import { Menu, X } from "lucide-react"; // For menu and close icons
import { Link } from 'react-router-dom';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 z-40 w-full flex justify-center items-center mt-2">
      <div className="glass flex items-center px-4 md:px-6 py-2 w-[90%] border-solid border-[#26222D] border-2 h-[8vh] md:h-[10vh] rounded-lg">
        <div className="flex items-center justify-between w-full">
        <Link to="/" className="font-[600] text-[#AE0D61] text-[18px]">
      IDEATEX
    </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex justify-end items-center gap-4 w-[60%]">
            <a href="/" className="font-[600] text-[16px] text-white">
              HOME
            </a>
            <a href="#about" className="font-[600] text-[16px] text-white">
              ABOUT US
            </a>
            <a href="#schedule" className="font-[600] text-[16px] text-white">
              SCHEDULE
            </a>
            <a href="#faq" className="font-[600] text-[16px] text-white">
              FAQS
            </a>
            <a href="#sponsor" className="font-[600] text-[16px] text-white">
              SPONSORS
            </a>
            <a href="/register" className="bg-[#AE0D61] font-[600] py-2 px-4 rounded-lg border-2 border-[#AE0D61] text-white hover:bg-[#AE0D61]">
              Register Now
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="text-[#AE0D61]">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#26222D] bg-opacity-95 flex flex-col items-center justify-center transition-opacity duration-300">
          <button onClick={toggleMenu} className="absolute top-8 right-8 text-white">
            <X size={28} />
          </button>
          <nav className="flex flex-col items-center space-y-4 mt-8">
            <a href="/" onClick={toggleMenu} className="text-white font-[600] text-[18px]">
              HOME
            </a>
            <a href="#about" onClick={toggleMenu} className="text-white font-[600] text-[18px]">
              ABOUT US
            </a>
            <a href="#schedule" onClick={toggleMenu} className="text-white font-[600] text-[18px]">
              SCHEDULE
            </a>
            <a href="#faq" onClick={toggleMenu} className="text-white font-[600] text-[18px]">
              FAQS
            </a>
            <a href="#sponsor" onClick={toggleMenu} className="text-white font-[600] text-[18px]">
              SPONSORS
            </a>
          </nav>
          <button
            onClick={toggleMenu}
            className="mt-8 bg-[#AE0D61] text-white font-[600] py-2 px-6 rounded-lg border-2 border-[#AE0D61] hover:bg-transparent hover:text-[#AE0D61]"
          >
            Register Now
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
