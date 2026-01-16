import React from 'react';

export function ImportantNotice(): React.JSX.Element {
  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-yellow-50 shadow-md">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <h4 className="mb-2 text-lg font-semibold text-gray-800">
              Important Notice
            </h4>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Violation of any of the above rules may result in disciplinary
              action Students are expected to maintain the highest standards of
              conduct and discipline at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
