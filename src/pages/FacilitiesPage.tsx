import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {Assets} from '@/assets/assetData';
import {laboratories, otherFacilities} from '@/data/facilitiesData';
import {FacilityCard} from '@/components/facilities/FacilityCard';
import {CallToAction} from '@/components/facilities/CallToAction';

export default function FacilitiesPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.facilities} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Same style as About page */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Facilities
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Facilities"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Laboratory Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
                Laboratory Facilities
              </h2>
              <p className="mt-2 text-base text-gray-600 sm:text-lg">
                State-of-the-art laboratories equipped with modern instruments
                and technology
              </p>
            </div>
            <div className="space-y-8">
              {laboratories.map((lab, index) => (
                <FacilityCard key={index} facility={lab} />
              ))}
            </div>
          </section>

          {/* Other Facilities Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
                Other Facilities
              </h2>
              <p className="mt-2 text-base text-gray-600 sm:text-lg">
                Comprehensive infrastructure to support student learning and
                development
              </p>
            </div>
            <div className="space-y-8">
              {otherFacilities.map((facility, index) => (
                <FacilityCard key={index} facility={facility} />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>
    </>
  );
}
