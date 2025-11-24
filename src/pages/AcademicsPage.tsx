import {courses, feeStructure} from '@/assets/assetData';
import React from 'react';
import {AcademicsInfoButton} from '@/components/academics/AcademicsInfoButton';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

export default function AcademicsPage(): React.JSX.Element {
  const facilities = [
    {
      icon: (
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      title: 'Modern Laboratories',
      description:
        'Well-equipped Computer, Electronics, Physics, and Medical Technology labs with latest instruments.',
    },
    {
      icon: (
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: 'Library Resources',
      description:
        'Comprehensive collection of books, journals, magazines, and digital resources for all programs.',
    },
    {
      icon: (
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Sports & Cultural Activities',
      description:
        'Facilities for games, sports, and cultural programs to ensure holistic student development.',
    },
    {
      icon: (
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: 'Infrastructure',
      description:
        'State-of-the-art classrooms, seminar halls, and learning spaces for quality education.',
    },
  ];

  return (
    <>
      <SEO {...pageSEO.academics} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-4 py-12 text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Academics
            </h1>
            <p className="max-w-3xl text-base sm:text-lg md:text-xl">
              Affiliated to Tripura University (A Central University)
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Introduction Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:mb-6 sm:text-3xl lg:text-4xl">
                Courses Offered
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Bhavan's Tripura College of Science & Technology offers a
                  diverse range of undergraduate programs in Science,
                  Technology, Management, and Humanities. All courses are
                  affiliated to Tripura University (A Central University) and
                  follow the university's curriculum and examination pattern.
                </p>
                <p>
                  Our programs are designed to provide quality education with a
                  focus on both theoretical knowledge and practical skills,
                  preparing students for successful careers in their chosen
                  fields.
                </p>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
                Programs & Eligibility
              </h2>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="rounded-lg border-l-4 border-[#900090] bg-linear-to-r from-blue-50 to-purple-50 p-5 transition-all duration-300 hover:shadow-lg sm:p-6">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
                          {course.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                          <span className="flex items-center text-gray-600">
                            <svg
                              className="mr-1.5 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-medium">Duration:</span>&nbsp;
                            {course.duration}
                          </span>
                          <span className="flex items-center text-gray-600">
                            <svg
                              className="mr-1.5 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="font-medium">Intake:</span>&nbsp;
                            {course.intake}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-sm sm:text-right sm:text-base">
                        {course.totalFee && (
                          <span className="font-semibold text-[#900090]">
                            Total: {course.totalFee}
                          </span>
                        )}
                        {course.firstYearFee && (
                          <span className="font-semibold text-[#900090]">
                            1st Year: {course.firstYearFee}
                          </span>
                        )}
                        {course.semesterFee && (
                          <span className="text-gray-600">
                            Later: {course.semesterFee}
                          </span>
                        )}
                        {course.yearlyFee && (
                          <span className="text-gray-600">
                            {course.yearlyFee}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm sm:text-base">
                      <p className="text-gray-700">
                        <span className="font-medium text-gray-800">
                          Eligibility:
                        </span>{' '}
                        {course.eligibility}
                      </p>
                      {course.combination !== 'N/A' && (
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Combination:
                          </span>{' '}
                          {course.combination}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <AcademicsInfoButton />

          {/* Future Programs */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-linear-to-r from-green-50 to-blue-50 p-6 shadow-md sm:p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <svg
                    className="h-8 w-8 text-green-600 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
                    Future Programs
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    B.Sc. in <span className="font-semibold">Microbiology</span>{' '}
                    and <span className="font-semibold">Physiotherapy</span>{' '}
                    with other necessary subjects as per requirements and
                    availability.
                  </p>
                  <p className="mt-2 text-sm text-gray-600 italic sm:text-base">
                    Subject to approval and affiliation by Tripura University
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fee Structure Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
                Fee Structure
              </h2>
              <div className="overflow-x-auto">
                <div className="space-y-6">
                  {feeStructure.map((fee, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 sm:p-5">
                      <h3 className="mb-4 text-lg font-bold text-[#900090] sm:text-xl">
                        {fee.course}
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex justify-between rounded bg-gray-50 p-3">
                          <span className="text-sm font-medium text-gray-700 sm:text-base">
                            Admission Fee:
                          </span>
                          <span className="text-sm font-semibold text-gray-900 sm:text-base">
                            {fee.admission}
                          </span>
                        </div>
                        <div className="flex justify-between rounded bg-gray-50 p-3">
                          <span className="text-sm font-medium text-gray-700 sm:text-base">
                            Development Fee:
                          </span>
                          <span className="text-sm font-semibold text-gray-900 sm:text-base">
                            {fee.development}
                          </span>
                        </div>
                        <div className="flex justify-between rounded bg-gray-50 p-3">
                          <span className="text-sm font-medium text-gray-700 sm:text-base">
                            Tuition Fee:
                          </span>
                          <span className="text-sm font-semibold text-gray-900 sm:text-base">
                            {fee.tuitionPerSem || fee.tuitionPerYear}
                          </span>
                        </div>
                        <div className="flex justify-between rounded bg-gray-50 p-3">
                          <span className="text-sm font-medium text-gray-700 sm:text-base">
                            Other Fees:
                          </span>
                          <span className="text-sm font-semibold text-gray-900 sm:text-base">
                            {fee.otherFees}
                          </span>
                        </div>
                        <div className="flex justify-between rounded bg-blue-100 p-3">
                          <span className="text-sm font-bold text-gray-800 sm:text-base">
                            1st Semester/Year:
                          </span>
                          <span className="text-sm font-bold text-[#900090] sm:text-base">
                            {fee.firstSemTotal || fee.firstYearTotal}
                          </span>
                        </div>
                        <div className="flex justify-between rounded bg-blue-100 p-3">
                          <span className="text-sm font-bold text-gray-800 sm:text-base">
                            Later Period:
                          </span>
                          <span className="text-sm font-bold text-[#900090] sm:text-base">
                            {fee.laterSemTotal ||
                              fee.laterYearTotal ||
                              fee.totalCourse}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-yellow-50 p-4 sm:p-5">
                <p className="text-sm font-medium text-gray-800 sm:text-base">
                  <span className="font-bold">Note:</span> University
                  Registration and Examination Fees are to be paid separately as
                  notified by Tripura University (A Central University).
                </p>
              </div>
            </div>
          </section>

          {/* Academic Facilities Section */}
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
                    <div className="shrink-0 text-[#900090]">
                      {facility.icon}
                    </div>
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
            </div>
          </section>

          {/* Contact for Academic Queries */}
          <section>
            <div className="rounded-lg bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] p-6 text-white shadow-lg sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
                Academic Inquiries
              </h2>
              <p className="mb-6 text-base leading-relaxed sm:text-lg">
                For detailed information about admission procedures, eligibility
                criteria, course structure, or any academic queries, please
                contact us:
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">(0381) 2861210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">+91-9436127328</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">
                    btcst15@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
