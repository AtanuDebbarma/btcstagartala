import {resources} from '@/data/homeData/collegeReourcesData';
import {CollegeResourcesTypes} from '@/types/homeTypes';

export default function CollegeResources() {
  return (
    <div className="container max-w-7xl mx-auto px-10 xl:px-0 py-8 mt-20">
      <div className="flex w-full justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 relative inline-block tracking-wide">
          College Resources
          <span className="absolute -bottom-1 right-0 w-1/2 h-1 bg-yellow-400 rounded"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource: CollegeResourcesTypes, index) => {
          const isFaculty = resource.title === 'Our Faculty';

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer">
              <div className="relative">
                <img
                  src={resource.image}
                  alt={resource.alt}
                  className={`w-full object-cover ${
                    isFaculty ? 'h-48 object-scale-down' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 flex items-end justify-center">
                  <h3 className="text-amber-50 font-bold p-4 text-xl">
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
