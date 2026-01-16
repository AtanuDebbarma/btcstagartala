import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {
  founderInfo,
  executiveCommittee,
  agartalaKendraCommittee,
  collegeGoverningBody,
  monitoringCommittee,
} from '@/data/committeeCellsData';

export default function CommitteeCellsPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.committeeCells} />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-4 py-12 text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Committee & Cells
            </h1>
            <p className="max-w-3xl text-base sm:text-lg md:text-xl">
              College Governing Body, Monitoring Committee & Other Committees
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Founder Section */}
          <div className="mb-12 rounded-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#900090] sm:text-3xl">
              {founderInfo.title}
            </h2>
            <p className="text-center text-xl font-semibold text-gray-800 sm:text-2xl">
              {founderInfo.name}
            </p>
          </div>

          {/* Executive Committee */}
          <div className="mb-12 rounded-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#900090] sm:text-3xl">
              {executiveCommittee.title}
            </h2>
            <div className="space-y-4">
              {executiveCommittee.members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border-b border-gray-200 pb-4 last:border-b-0 sm:flex-row sm:justify-between">
                  <div className="font-semibold text-gray-700 sm:w-1/3">
                    {member.position}
                  </div>
                  <div className="text-gray-800 sm:w-2/3">
                    {member.name && <p>{member.name}</p>}
                    {member.names && (
                      <ul className="space-y-1">
                        {member.names.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agartala Kendra Committee */}
          <div className="mb-12 rounded-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#900090] sm:text-3xl">
              {agartalaKendraCommittee.title}
            </h2>
            <div className="space-y-4">
              {agartalaKendraCommittee.members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border-b border-gray-200 pb-4 last:border-b-0 sm:flex-row sm:justify-between">
                  <div className="font-semibold text-gray-700 sm:w-1/3">
                    {member.position}
                  </div>
                  <div className="text-gray-800 sm:w-2/3">
                    {member.name && <p>{member.name}</p>}
                    {member.names && (
                      <ul className="space-y-1">
                        {member.names.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* College Governing Body */}
          <div className="mb-12 rounded-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-[#900090] sm:text-3xl">
              {collegeGoverningBody.title}
            </h2>
            <p className="mb-6 text-center text-sm whitespace-pre-line text-gray-600">
              {collegeGoverningBody.subtitle}
            </p>
            <div className="space-y-4">
              {collegeGoverningBody.members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border-b border-gray-200 pb-4 last:border-b-0 sm:flex-row sm:justify-between">
                  <div className="font-semibold text-gray-700 sm:w-1/3">
                    {member.position}
                  </div>
                  <div className="whitespace-pre-line text-gray-800 sm:w-2/3">
                    {member.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Committee */}
          <div className="mb-12 rounded-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#900090] sm:text-3xl">
              {monitoringCommittee.title}
            </h2>
            <div className="space-y-4">
              {monitoringCommittee.members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border-b border-gray-200 pb-4 last:border-b-0 sm:flex-row sm:justify-between">
                  <div className="font-semibold text-gray-700 sm:w-1/3">
                    {member.position}
                  </div>
                  <div className="text-gray-800 sm:w-2/3">{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
