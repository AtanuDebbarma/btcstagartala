import {useEffect, useRef, useState} from 'react';
import {TopBar} from '@/components/navbar/topBar';
import {LogoSection} from '@/components/navbar/logoSection';
import {MobileMenu} from '@/components/navbar/mobileMenu';
import {NavLinks} from '@/components/navbar/navlinks';

const CollegeNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (topRef.current) {
        const {bottom} = topRef.current.getBoundingClientRect();
        setIsSticky(bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full font-sans">
      <div ref={topRef}>
        <TopBar />
        <LogoSection />
      </div>

      <nav
        className={`flex bg-blue-600 text-white md:justify-center md:items-center justify-start items-start px-4 py-1 transition-all duration-300 z-50 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''
        }`}>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(true)}>
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <NavLinks />
      </nav>

      {/* Push content down when nav is sticky */}
      {isSticky && <div className="h-[60px] md:h-[48px]" />}

      {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
    </div>
  );
};

export default CollegeNavbar;
