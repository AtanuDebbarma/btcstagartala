import React from 'react';

export function IntroSection(): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:mb-6 sm:text-3xl lg:text-4xl">
          Student Activities & Development
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          <p>
            At BTCST, we believe in holistic development of our students. Beyond
            academics, we provide numerous opportunities for students to explore
            their interests, develop new skills, and grow as well-rounded
            individuals.
          </p>
          <p>
            Our diverse range of activities ensures that every student finds
            their passion and develops essential life skills such as leadership,
            teamwork, communication, and creativity.
          </p>
        </div>
      </div>
    </section>
  );
}
