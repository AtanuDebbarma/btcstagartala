import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {Assets} from '@/assets/assetData';
import {activities} from '@/data/activitiesData';
import {IntroSection} from '@/components/activities/IntroSection';
import {ActivityCard} from '@/components/activities/ActivityCard';
import {CallToAction} from '@/components/activities/CallToAction';

export default function ActivitiesPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.activities} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Same style as About page */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Activities
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Activities"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Introduction Section */}
          <IntroSection />

          {/* Activities Grid */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="space-y-8">
              {activities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
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
