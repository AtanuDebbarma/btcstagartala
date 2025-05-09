import {useRef, useEffect, Dispatch, SetStateAction} from 'react';
import {MobileLinks} from './navlinks';

type MobileMenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu = ({setMenuOpen}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 766) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [setMenuOpen]);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex justify-start bg-black/50">
      <div
        ref={menuRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="fixed inset-y-0 left-0 w-3/4 max-w-xs translate-x-0 transform overflow-auto bg-blue-700 p-5 pb-10 text-white transition-transform duration-300 ease-in-out">
        <button
          className="absolute top-3 right-3 text-xl text-white transition-transform duration-180 ease-in-out active:scale-95"
          onClick={() =>
            setTimeout(() => {
              setMenuOpen(false);
            }, 200)
          }>
          <i className="fa-solid fa-times"></i>
        </button>
        <MobileLinks setMenuOpen={setMenuOpen} />
      </div>
    </div>
  );
};
