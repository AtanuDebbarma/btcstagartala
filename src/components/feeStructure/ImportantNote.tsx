import React from 'react';

export function ImportantNote(): React.JSX.Element {
  return (
    <div className="mt-8 rounded-lg bg-yellow-50 p-6 shadow-md">
      <div className="flex items-start gap-3">
        <svg
          className="h-6 w-6 shrink-0 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h4 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
            Important Note
          </h4>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            University Registration and Examination Fees are to be paid
            separately as notified by Tripura University (A Central University).
            The fees mentioned above are subject to change as per university
            guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
