import React from 'react';

interface FacilityCardProps {
  facility: {
    title: string;
    icon: React.ReactNode;
    description: string;
    color: string;
    iconColor: string;
    image?: string;
    note?: string;
  };
}

export function FacilityCard({facility}: FacilityCardProps): React.JSX.Element {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-linear-to-r ${facility.color} shadow-md transition-all duration-300 hover:shadow-xl`}>
      <div className="p-6 sm:p-8">
        {facility.image ? (
          // Layout with image
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Image Section */}
            <div className="lg:w-2/5">
              <img
                src={facility.image}
                alt={facility.title}
                loading="lazy"
                className="h-64 w-full rounded-lg object-cover shadow-md lg:h-full"
              />
            </div>
            {/* Content Section */}
            <div className="flex-1">
              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className={`shrink-0 rounded-full bg-white p-3 shadow-md ${facility.iconColor} sm:p-4`}>
                  {facility.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl lg:text-3xl">
                    {facility.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    {facility.description}
                  </p>
                  {facility.note && (
                    <p className="mt-3 text-sm text-gray-600 italic sm:text-base">
                      Note: {facility.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Layout without image
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className={`shrink-0 rounded-full bg-white p-3 shadow-md ${facility.iconColor} sm:p-4`}>
              {facility.icon}
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl lg:text-3xl">
                {facility.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                {facility.description}
              </p>
              {facility.note && (
                <p className="mt-3 text-sm text-gray-600 italic sm:text-base">
                  Note: {facility.note}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
