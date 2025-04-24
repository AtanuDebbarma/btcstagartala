import {links} from '@/data/navBarData/topNavBarData';
import {Dispatch, SetStateAction} from 'react';
import {Link} from 'react-router-dom';

export const NavLinks = () => (
  <div className="hidden flex-wrap justify-center text-sm md:flex">
    {links.map(({name, path}) => (
      <Link
        to={path}
        key={name}
        className="px-3 py-3 transition-transform duration-150 ease-in-out hover:bg-blue-700 active:scale-90">
        {name}
      </Link>
    ))}
  </div>
);

export const MobileLinks = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div
    className="mt-8 flex flex-col space-y-4"
    onClick={() =>
      setTimeout(() => {
        setMenuOpen(false);
      }, 200)
    }>
    {links.map(({name, path}) => (
      <Link
        key={name}
        to={path}
        className="border-b border-white py-2 text-lg transition-transform duration-150 ease-in-out active:scale-90">
        {name}
      </Link>
    ))}
  </div>
);
