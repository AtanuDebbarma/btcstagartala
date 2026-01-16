import React from 'react';

export function ImportantNotice(): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="overflow-hidden rounded-lg bg-yellow-50 shadow-md">
        <div className="border-l-4 border-yellow-400 p-6">
          <div className="flex items-start gap-4">
            <svg
              className="h-6 w-6 shrink-0 text-yellow-600 sm:h-8 sm:w-8"
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
            <div className="flex-1">
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                Important Notice
              </h4>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                All students are required to wear the prescribed uniform on all
                working days. Proper uniform is mandatory for attending classes,
                examinations, and college events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
