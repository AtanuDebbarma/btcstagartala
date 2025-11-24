import {links} from '@/data/navBarData/topNavBarData';
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

export const NavLinks = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    setTimeout(() => {
      navigate(path);
      scrollTo(0, 0);
    }, 200);
  };

  return (
    <div className="hidden flex-wrap justify-center text-sm md:flex">
      {links.map(({name, path}) => (
        <div
          key={name}
          onClick={() => handleNav(path)}
          className="cursor-pointer px-3 py-3 transition-transform duration-180 ease-in-out hover:bg-[#630063] active:scale-95">
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

  const handleNav = (path: string) => {
    setTimeout(() => {
      navigate(path);
      scrollTo(0, 0);
      setMenuOpen(false);
    }, 200);
  };

  return (
    <div className="mt-8 flex flex-col space-y-4">
      {links.map(({name, path}) => (
        <div
          key={name}
          onClick={() => handleNav(path)}
          className="cursor-pointer border-b border-white py-2 text-lg transition-transform duration-180 ease-in-out active:scale-95">
          {name}
        </div>
      ))}
    </div>
  );
};
