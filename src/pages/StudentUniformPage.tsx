import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {Assets} from '@/assets/assetData';
import {uniformItems, uniformPhotos} from '@/data/studentUniformData';
import {UniformGallery} from '@/components/studentUniform/UniformGallery';
import {UniformDetails} from '@/components/studentUniform/UniformDetails';
import {ImportantNotice} from '@/components/studentUniform/ImportantNotice';
import {ContactSection} from '@/components/studentUniform/ContactSection';

export default function StudentUniformPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.studentUniform} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Same style as other pages */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Student's Uniforms
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Student Uniforms"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Uniform Photos Section */}
          <UniformGallery photos={uniformPhotos} />

          {/* Dress Code Details Section */}
          <UniformDetails items={uniformItems} />

          {/* Important Notice Section */}
          <ImportantNotice />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </>
  );
}
