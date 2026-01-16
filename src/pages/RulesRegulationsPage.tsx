import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {Assets} from '@/assets/assetData';
import {rules} from '@/data/rulesRegulationsData';
import {RuleCard} from '@/components/rulesRegulations/RuleCard';
import {ImportantNotice} from '@/components/rulesRegulations/ImportantNotice';
import {ContactSection} from '@/components/rulesRegulations/ContactSection';

export default function RulesRegulationsPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.rulesRegulations} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Same style as About/Academics/Facilities */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Rules & Regulations
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Rules & Regulations"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Rules Section */}
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-6 py-4">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Student Code of Conduct
              </h3>
              <p className="mt-2 text-sm text-gray-200">
                All students are required to adhere to the following rules and
                regulations
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {rules.map((rule, index) => (
                  <RuleCard key={index} rule={rule} />
                ))}
              </div>
            </div>
          </div>

          {/* Important Notice Section */}
          <ImportantNotice />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </>
  );
}
