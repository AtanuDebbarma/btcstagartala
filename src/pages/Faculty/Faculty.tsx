import {RouteNames} from '@/constants/routeNames';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const Faculty = (): React.JSX.Element => {
  const navigation = useNavigate();

  const facultyButtons = [
    {
      name: 'Permanent Faculty',
      url: 'permanent-faculty',
    },
    {
      name: 'Non Teaching Staffs',
      url: 'non-teaching-staffs',
    },
    {
      name: 'Guest Faculty',
      url: 'guest-faculty',
    },
  ];
  const handleClick = (url: string) => {
    setTimeout(() => {
      navigation(`${RouteNames.FACULTY}/${url}`);
      scrollTo(0, 0);
    }, 200);
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mt-12 flex flex-col items-center justify-center gap-4 bg-gray-200 px-10 py-10">
        {facultyButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleClick(button.url)}
            className="w-full min-w-[300px] cursor-pointer transition-transform duration-180 ease-in-out focus:outline-none active:scale-95">
            <div className="rounded-sm bg-[#0a2540] px-4 py-4.5 text-center text-white shadow-md">
              <h3 className="relative inline-block text-lg font-semibold tracking-wide uppercase">
                {button.name}
                <span className="absolute -bottom-1 left-1/4 mt-2 h-[3px] w-1/2 rounded bg-yellow-400"></span>
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
