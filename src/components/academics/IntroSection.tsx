import React from 'react';

export function IntroSection(): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:mb-6 sm:text-3xl lg:text-4xl">
          Courses Offered
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          <p>
            Bhavan's Tripura College of Science & Technology offers a diverse
            range of undergraduate programs in Science, Technology, Management,
            and Humanities. All courses are affiliated to Tripura University (A
            Central University) and follow the university's curriculum and
            examination pattern.
          </p>
          <p>
            Our programs are designed to provide quality education with a focus
            on both theoretical knowledge and practical skills, preparing
            students for successful careers in their chosen fields.
          </p>
        </div>
      </div>
    </section>
  );
}
