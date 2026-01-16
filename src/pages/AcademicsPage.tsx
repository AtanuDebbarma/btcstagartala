import {Assets} from '@/assets/assetData';
import React from 'react';
import {AcademicsInfoButton} from '@/components/academics/AcademicsInfoButton';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {IntroSection} from '@/components/academics/IntroSection';
import {CoursesSection} from '@/components/academics/CoursesSection';
import {FuturePrograms} from '@/components/academics/FuturePrograms';
import {FeeStructureSection} from '@/components/academics/FeeStructureSection';
import {FacilitiesSection} from '@/components/academics/FacilitiesSection';
import {ContactSection} from '@/components/academics/ContactSection';

export default function AcademicsPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.academics} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Academics
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
            <p className="mt-2 text-sm font-semibold text-nowrap text-gray-100 drop-shadow-lg sm:text-base md:text-lg">
              Affiliated to Tripura University (A Central University)
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Academics"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Introduction Section */}
          <IntroSection />

          {/* Courses Section */}
          <CoursesSection />

          <AcademicsInfoButton />

          {/* Future Programs */}
          <FuturePrograms />

          {/* Fee Structure Section */}
          <FeeStructureSection />

          {/* Academic Facilities Section */}
          <FacilitiesSection />

          {/* Contact for Academic Queries */}
          <ContactSection />
        </div>
      </div>
    </>
  );
}
