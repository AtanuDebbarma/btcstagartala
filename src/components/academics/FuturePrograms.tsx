import React from 'react';
import {futurePrograms} from '@/data/academicsData';

export function FuturePrograms(): React.JSX.Element {
  return (
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
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
              Future Programs
            </h2>
            <ul className="space-y-3 text-base text-gray-700 sm:text-lg">
              {futurePrograms.map((program, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1.5 mr-3 h-2 w-2 shrink-0 rounded-full bg-green-600"></span>
                  <span className="leading-relaxed">
                    <span className="font-semibold">{program.title}</span>{' '}
                    {program.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600 italic sm:text-base">
              Subject to approval and affiliation by Tripura University
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
