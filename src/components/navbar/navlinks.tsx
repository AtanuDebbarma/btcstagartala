import {links} from '@/data/navBarData/topNavBarData';
import type {Dispatch, SetStateAction} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

export const NavLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    setTimeout(() => {
      void navigate(path);
      scrollTo(0, 0);
    }, 200);
  };

  const isActive = (path: string) => {
    // Exact match for current path
    if (location.pathname === path) return true;
    // Check if current path starts with the link path (for sub-routes like /faculty/permanent-faculty)
    if (path !== '/' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  return (
    <div className="hidden flex-wrap justify-center text-sm md:flex">
      {links.map(({name, path}) => (
        <div
          key={name}
          onClick={() => handleNav(path)}
          className={`cursor-pointer px-3 py-3 transition-all duration-180 ease-in-out hover:bg-[#630063] active:scale-95 ${
            isActive(path)
              ? 'border-b-2 border-yellow-400 bg-[#630063] font-semibold'
              : ''
          }`}>
          {name}
        </div>
      ))}
    </div>
  );
};

export const MobileLinks = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    setTimeout(() => {
      void navigate(path);
      scrollTo(0, 0);
      setMenuOpen(false);
    }, 200);
  };

  const isActive = (path: string) => {
    // Exact match for current path
    if (location.pathname === path) return true;
    // Check if current path starts with the link path (for sub-routes like /faculty/permanent-faculty)
    if (path !== '/' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  return (
    <div className="mt-8 flex flex-col space-y-4">
      {links.map(({name, path}) => (
        <div
          key={name}
          onClick={() => handleNav(path)}
          className={`cursor-pointer border-b border-white py-2 text-lg transition-all duration-180 ease-in-out active:scale-95 ${
            isActive(path)
              ? 'border-l-4 border-yellow-400 bg-[#630063] pl-4 font-semibold'
              : ''
          }`}>
          {name}
        </div>
      ))}
    </div>
  );
};
