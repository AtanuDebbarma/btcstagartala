import {resources} from '@/data/homeData/collegeReourcesData';
import {CollegeResourcesTypes} from '@/types/homeTypes';

export default function CollegeResources() {
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
            <div
              key={index}
              className="transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
