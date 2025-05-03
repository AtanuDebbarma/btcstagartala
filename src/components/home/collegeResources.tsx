import {resources} from '@/data/homeData/collegeReourcesData';
import {CollegeResourcesTypes} from '@/types/homeTypes';
import {useNavigate} from 'react-router-dom';

export default function CollegeResources() {
  const nanvigation = useNavigate();

  const handleNav = (url: string) => {
    setTimeout(() => {
      nanvigation(url);
      scrollTo(0, 0);
    }, 200);
  };
  return (
    <div className="container mx-auto mt-20 max-w-7xl px-10 py-8 xl:px-0">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          College Resources
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource: CollegeResourcesTypes, index) => {
          const isFaculty = resource.title === 'Our Faculty';

          return (
            <a
              onClick={() => handleNav(resource.url)}
              key={index}
              className="transform-transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition duration-180 ease-in-out hover:-translate-y-1 hover:scale-105 active:scale-95">
              <div className="relative">
                <img
                  src={resource.image}
                  alt={resource.alt}
                  className={`w-full object-cover ${isFaculty ? 'h-48 object-scale-down' : 'h-48'}`}
                />
                <div className="absolute inset-0 flex items-end justify-center bg-black/20">
                  <h3 className="p-4 text-xl font-bold text-amber-50">
                    {resource.title}
                  </h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
