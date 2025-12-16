import React, {useEffect, useRef, useState} from 'react';
import {TopBar} from '@/components/navbar/topBar';
import {LogoSection} from '@/components/navbar/logoSection';
import {MobileMenu} from '@/components/navbar/mobileMenu';
import {NavLinks} from '@/components/navbar/navlinks';

const CollegeNavbar = ({
  setFloatingIconVisible,
}: {
  setFloatingIconVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    <header className="flex w-full flex-col font-sans">
      <div ref={topRef}>
        <TopBar />
        <LogoSection />
      </div>

      <nav
        aria-label="Main navigation"
        className={`z-50 flex items-start justify-start bg-[#900090] px-4 py-1 text-white transition-all duration-300 md:items-center md:justify-center ${
          isSticky ? 'fixed top-0 right-0 left-0 shadow-md' : ''
        }`}>
        <button
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className="text-white transition-transform duration-180 ease-in-out focus:outline-none active:scale-95 md:hidden"
          onClick={() => {
            setTimeout(() => {
              setFloatingIconVisible(false);
              setMenuOpen(true);
            }, 200);
          }}>
          <i className="fa-solid fa-bars text-xl" aria-hidden="true"></i>
        </button>
        <NavLinks />
      </nav>

      {/* Push content down when nav is sticky */}
      {isSticky && <div className="h-15 md:h-12" />}

      {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
    </header>
  );
};

export default CollegeNavbar;
