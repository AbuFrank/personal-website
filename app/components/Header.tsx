'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME

const navLinks = [
  { title: 'Home', slug: '' },
  { title: 'Chess', slug: 'chess' },
  { title: 'Space', slug: 'space' }
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isModified = (pathname === '/' || pathname === '/space') && !scrolled;


  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm py-2 shadow-md' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xl font-bold ${isModified ? 'text-white' : 'text-gray-800'}`}
        >
          <Link href="/">{siteName}</Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.title.toLowerCase()}
              href={`/${item.slug}`}
              className={`${isModified ? 'text-white' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isModified ? 'text-white' : 'text-gray-600'} focus:outline-none`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`md:hidden ${isModified ? 'bg-transparent' : 'bg-white'} mt-4`}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.title.toLowerCase()}
                href={`/${item.slug}`}
                className={`${isModified ? 'text-white' : 'text-gray-600'} hover:text-blue-600 py-2 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;