import {links} from '@/data/navBarData/topNavBarData';
import {Link} from 'react-router-dom';

export const NavLinks = () => (
  <div className="hidden flex-wrap justify-center text-sm md:flex">
    {links.map(({name, path}) => (
      <Link to={path} key={name} className="px-3 py-3 hover:bg-blue-700">
        {name}
      </Link>
    ))}
  </div>
);

export const MobileLinks = () => (
  <div className="mt-8 flex flex-col space-y-4">
    {links.map(({name, path}) => (
      <Link key={name} to={path} className="border-b border-white py-2 text-lg">
        {name}
      </Link>
    ))}
  </div>
);
