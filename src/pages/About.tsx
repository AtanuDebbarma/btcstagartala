import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {Assets} from '@/assets/assetData';

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <SEO {...pageSEO.about} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="About Us"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Introduction Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
                Welcome to BTCST
              </h2>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                {/* Image Section */}
                <div className="lg:w-2/5">
                  <img
                    src="https://old.btcstagartala.org/wp-content/uploads/2024/05/COLLEGE-FRONT1-1024x768.jpg"
                    alt="BTCST College Front View"
                    loading="lazy"
                    className="h-64 w-full rounded-lg object-cover shadow-md lg:h-full"
                  />
                </div>
                {/* Content Section */}
                <div className="flex-1 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  <p>
                    Bhavan's Tripura College of Science & Technology (BTCST) is
                    a premier institution affiliated to Tripura University (A
                    Central University), located at Anandanagar, Agartala, West
                    Tripura - 799004.
                  </p>
                  <p>
                    The College is situated nearly 10 km. to the South-East of
                    the capital city, Agartala having regular bus and auto
                    services from the city. Besides, we have our own
                    arrangements of bus for transport of the students and staff
                    of the college. At present the College has got several class
                    rooms with glass black board, spacious and well furnished
                    lecture halls, well equipped laboratories and library. One
                    big hall named (Multi Purpose Hall) serves the purpose of
                    auditorium. The second phase of construction in the college
                    is in progress and is scheduled to be completed soon. This
                    includes a new Administrative block, Class rooms,
                    Laboratories, Library, Conference Hall, Canteen etc.
                  </p>
                  <p>
                    It is hoped that the college will serve the entire
                    North-East Region in near future with regard to the study of
                    Information Technology and many other non conventional
                    modern subjects—the need of the day.
                  </p>
                </div>
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
                  values through education. Kulapati Dr. Kanhaiyalal Maneklal
                  Munshi [popularly known as Dr. K M Munshi] founded Bharatiya
                  Vidya Bhavan in 1938 having hearty Blessings from Mahatma
                  Gandhi and active support and co-operation from All-India
                  leaders like Dr. Rajendra Prasad, Shri C. Rajagopalachari, Dr.
                  S. Radhakrishnan, Pandit Jawaharlal Nehru and many others.
                </p>
                <p>
                  Bharatiya Vidya Bhavan was established around the time when
                  freedom of the country was not in doubt- the question was when
                  and how soon. With freedom round the corner, people were
                  concerned about the New India that would emerge soon. Munshiji
                  not only dreamt of a Resurgent India but also felt the need to
                  work to achieve this. This resulted in the founding of
                  Bharatiya Vidya Bhavan.
                </p>
                <p>
                  Bhavan has its root firmly embedded in the Indian soil. It is
                  spreading its branches to reach out to encompass the best of
                  the Modern World in the fields of Science, Technology,
                  Economics and Management. Bhavan is a unique establishment
                  where Sanskrit classes are run side by side an Engineering
                  College - Gita classes function along with Institute of
                  Management. Traditional teachings of Fine Arts as well as
                  teaching of Modern Science, Arts and Commerce are found in
                  Bhavan’s Schools and Colleges.
                </p>
                <p>
                  Bharatiya Vidya Bhavan has 119 branches in India and 9
                  overseas branches in countries like Australia, Canada, Kuwait,
                  Mexico, Portugal, Singapore, South Africa, UK and USA. Number
                  of constituent Institutions run by Bharatiya Vidya Bhavan is
                  373 with over 2 lac student’s enrolled covering over 11,000
                  employees. Bharatiya Vidya Bhavan has reached out to the World
                  through its value-based publications numbering over 1800 under
                  the banner Bhavan’s Book University.
                </p>
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
