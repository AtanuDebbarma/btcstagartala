import React from 'react';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/constants/routeNames';
import {facilities} from '@/data/academicsData';

export function FacilitiesSection(): React.JSX.Element {
  const navigate = useNavigate();

  const handleNavigateToFacilities = () => {
    setTimeout(() => {
      void navigate(RouteNames.FACILITIES);
      window.scrollTo(0, 0);
    }, 200);
  };

  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
          Academic Facilities
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 rounded-lg bg-linear-to-r from-gray-50 to-blue-50 p-5 transition-all duration-300 hover:shadow-md">
              <div className="shrink-0 text-[#900090]">{facility.icon}</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl">
                  {facility.title}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Facilities Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNavigateToFacilities}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#900090] px-8 py-4 text-white shadow-lg transition-all duration-180 hover:bg-[#630063] hover:shadow-xl active:scale-95 active:opacity-80">
            <span className="relative z-10 flex items-center gap-2 text-base font-semibold sm:text-lg">
              View All Facilities
              <svg
                className="h-5 w-5 transition-transform duration-180 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
