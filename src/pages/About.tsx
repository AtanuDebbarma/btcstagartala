import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.about} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-4 py-12 text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              About Us
            </h1>
            <p className="max-w-3xl text-base sm:text-lg md:text-xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Introduction Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:mb-6 sm:text-3xl lg:text-4xl">
                Welcome to BTCST
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Bhavan's Tripura College of Science & Technology (BTCST) is a
                  premier institution affiliated to Tripura University (A
                  Central University), located at Anandanagar, Agartala, West
                  Tripura - 799004.
                </p>
                <p>
                  Established with a vision to provide quality education in
                  science and technology, BTCST has been a beacon of academic
                  excellence in the North East region of India. Our institution
                  is committed to nurturing young minds and preparing them for
                  the challenges of the modern world.
                </p>
                <p>
                  We take pride in our state-of-the-art infrastructure,
                  experienced faculty, and student-centric approach to
                  education. Our curriculum is designed to blend theoretical
                  knowledge with practical applications, ensuring our students
                  are industry-ready upon graduation.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {/* Vision */}
              <div className="rounded-lg bg-blue-50 p-6 shadow-md sm:p-8">
                <div className="mb-4 flex items-center sm:mb-6">
                  <div className="mr-4 rounded-full bg-blue-600 p-3 text-white">
                    <svg
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                    Our Vision
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                  To emerge as a center of excellence in technical education,
                  fostering innovation, research, and entrepreneurship while
                  maintaining the highest standards of academic integrity and
                  social responsibility.
                </p>
              </div>

              {/* Mission */}
              <div className="rounded-lg bg-green-50 p-6 shadow-md sm:p-8">
                <div className="mb-4 flex items-center sm:mb-6">
                  <div className="mr-4 rounded-full bg-green-600 p-3 text-white">
                    <svg
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                    Our Mission
                  </h3>
                </div>
                <ul className="space-y-3 text-base text-gray-700 sm:text-lg">
                  <li className="flex items-start">
                    <span className="mt-1 mr-2 text-green-600">•</span>
                    <span>
                      Provide quality education in Science and Technology
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-2 text-green-600">•</span>
                    <span>
                      Develop competent professionals and responsible citizens
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-2 text-green-600">•</span>
                    <span>Foster research and innovation culture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-1 mr-2 text-green-600">•</span>
                    <span>Create industry-ready graduates</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bharatiya Vidya Bhavan Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:mb-6 sm:text-3xl lg:text-4xl">
                About Bharatiya Vidya Bhavan
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  Bharatiya Vidya Bhavan is one of India's premier educational
                  and cultural institutions. Founded in 1938 by Dr. K.M. Munshi,
                  it has been at the forefront of promoting Indian culture and
                  values through education.
                </p>
                <p>
                  With its headquarters in Mumbai, Bharatiya Vidya Bhavan
                  operates over 360 institutions across India and abroad,
                  including schools, colleges, and cultural centers. The
                  organization is committed to the synthesis of tradition and
                  modernity in education.
                </p>
                <p>
                  BTCST, as a part of this prestigious institution, carries
                  forward the legacy of excellence and value-based education
                  that Bharatiya Vidya Bhavan represents.
                </p>
              </div>
            </div>
          </section>

          {/* Courses Offered Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
                Courses Offered
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {[
                  {
                    name: 'B.Sc. Honours in Computer Science',
                    duration: '3 Years (1+1+1)',
                    intake: '30',
                  },
                  {
                    name: 'BBA (Bachelor of Business Administration)',
                    duration: '3 Years (6 Sem.)',
                    intake: '40',
                  },
                  {
                    name: 'BIT (Bachelor of Information Technology)',
                    duration: '3 Years (6 Sem.)',
                    intake: '40',
                  },
                  {
                    name: 'BMLT (B.Sc. in Medical Laboratory Technology)',
                    duration: '3 Years (6 Sem.)',
                    intake: '30',
                  },
                  {
                    name: 'B.Sc. in Physics (Major/Honours/Research)',
                    duration: '3/4 Years (6/8 Sem.)',
                    intake: '20',
                  },
                  {
                    name: 'B.Sc. in Mathematics (Major/Honours/Research)',
                    duration: '3/4 Years (6/8 Sem.)',
                    intake: '20',
                  },
                  {
                    name: 'B.A. in English (Major/Honours/Research)',
                    duration: '3/4 Years (6/8 Sem.)',
                    intake: '30',
                  },
                  {
                    name: 'B.Sc. Honours in Electronics',
                    duration: '3 Years (1+1+1)',
                    intake: '30',
                  },
                  {
                    name: 'B.Sc. Pass with Computer Science, Electronics, Mathematics and Physics',
                    duration: '3 Years (1+1+1)',
                    intake: '30',
                  },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="rounded-r-lg border-l-4 border-[#900090] bg-blue-50 p-4 transition-shadow duration-300 hover:shadow-md sm:p-5">
                    <h4 className="mb-2 text-base font-semibold text-gray-800 sm:mb-3 sm:text-lg">
                      {course.name}
                    </h4>
                    <div className="space-y-1 text-sm sm:space-y-2 sm:text-base">
                      <p className="text-gray-600">
                        <span className="font-medium">Duration:</span>{' '}
                        {course.duration}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Intake:</span>{' '}
                        {course.intake}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="rounded-lg bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] p-6 text-white shadow-lg sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl lg:text-4xl">
                Get In Touch
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold sm:mb-4 sm:text-xl">
                    <svg
                      className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Address
                  </h3>
                  <p className="text-sm text-blue-100 sm:text-base">
                    Anandanagar, Agartala
                    <br />
                    West Tripura - 799004
                    <br />
                    North East, India
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold sm:mb-4 sm:text-xl">
                    <svg
                      className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
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
                    Phone
                  </h3>
                  <p className="text-sm text-blue-100 sm:text-base">
                    (0381) 2861210
                    <br />
                    +91-9436127328
                    <br />
                    +91-9436468794
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold sm:mb-4 sm:text-xl">
                    <svg
                      className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
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
                    Email
                  </h3>
                  <p className="text-sm wrap-break-word text-blue-100 sm:text-base">
                    btcst15@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
