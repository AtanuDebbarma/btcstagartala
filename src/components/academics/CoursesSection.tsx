import React from 'react';
import {courses} from '@/assets/assetData';

export function CoursesSection(): React.JSX.Element {
  return (
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
                      Later: {course.semesterFee}/sem
                    </span>
                  )}
                  {course.yearlyFee && (
                    <span className="text-gray-600">{course.yearlyFee}</span>
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
  );
}
