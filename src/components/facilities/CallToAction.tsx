import React from 'react';

export function CallToAction(): React.JSX.Element {
  return (
    <section>
      <div className="rounded-lg bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] p-6 text-white shadow-lg sm:p-8 lg:p-10">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
            Visit Our Campus
          </h2>
          <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed sm:text-lg">
            Experience our facilities firsthand. Schedule a campus tour to
            explore our laboratories, classrooms, and other amenities. For more
            information, please contact our administration office.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              <span className="text-sm sm:text-base">btcst15@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
