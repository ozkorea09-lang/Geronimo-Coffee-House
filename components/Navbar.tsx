import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '브랜드 소개', path: '/about' },
    { name: '메뉴', path: '/menu' },
    { name: '갤러리', path: '/gallery' },
    { name: '새소식', path: '/news' },
  ];

  // Distinct separated look: Always dark background for clear separation
  const headerClass = `fixed w-full z-50 transition-all duration-300 shadow-wood ${
    isScrolled 
      ? 'bg-brand-coffee/95 backdrop-blur-md py-3' 
      : 'bg-brand-coffee py-5'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-brand-gold p-1.5 rounded-sm shadow-md group-hover:bg-white transition-colors duration-300">
             <Coffee className="text-brand-coffee w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-widest text-brand-cream group-hover:text-brand-gold transition-colors">GERONIMO</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-wood">Coffee House</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                location.pathname === link.path 
                  ? 'text-brand-gold border-b border-brand-gold pb-1' 
                  : 'text-brand-latte hover:text-brand-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="px-5 py-2 border border-brand-wood text-brand-wood text-xs hover:bg-brand-wood hover:text-white transition-all duration-300 rounded-sm uppercase tracking-widest"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-latte hover:text-brand-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-coffee/95 backdrop-blur-lg border-t border-brand-mocha py-8 px-6 flex flex-col space-y-6 animate-fade-in-down shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-serif text-brand-latte hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold pl-4 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin"
            className="text-sm text-brand-wood pt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            관리자 로그인
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;