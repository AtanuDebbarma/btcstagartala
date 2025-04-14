import {Assets} from '@/assets/assetData';

export const SmallAboutCard = () => {
  return (
    <div className="mt-20">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Our College at a Glance
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto mt-3 max-w-7xl px-10 xl:px-0">
        <div className="w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="flex flex-col gap-10 px-5 py-10 lg:flex-row lg:gap-0">
            {/* Left Content Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:px-5">
              <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-2xl">
                  Bhavan’s Tripura College of Science & Technology
                </h1>
                <p className="text-justify text-sm leading-relaxed text-gray-700 sm:text-base">
                  Bharatiya Vidya Bhavan authority was requested by the
                  Government of Tripura to set up a college of Science &
                  Technology to teach non-conventional subjects that are not
                  being taught at other colleges in the State and that the
                  College would be self-financing. Accordingly, 4.88 acres of
                  land was made available at Anandanagar and a sum of rupees 50
                  lacs was also granted by the Government of Tripura at the
                  initial stage for development of the College. ONGC, Tripura
                  Asset also extended rupees 15 lacs for the development of the
                  college. Bhavan’s Tripura College of Science & Technology
                  (BTCST) started its journey on 20th September, 2003. It was
                  inaugurated by Sri. Manik Sarkar, Hon’ble Chief Minister of
                  Tripura in the august presence of Late Dr. Pratap Chandra
                  Chunder, Ex-Chairman, BVB , Kolkata Kendra and Ex- Minister of
                  Education, Government of India and other state Government &
                  BVB functionaries.
                </p>
              </div>
              <span className="mt-4 flex cursor-default items-center text-sm font-medium text-gray-700 sm:text-base">
                Need to know about our campus.
                <a
                  href="#"
                  className="ml-1 font-bold text-blue-500 hover:underline">
                  Know More →
                </a>
              </span>
            </div>

            {/* Right Image Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:justify-center lg:px-5">
              <img
                src={Assets.link.aboutShortImg}
                alt="College Image"
                className="h-auto max-h-[350px] w-full rounded-md object-cover"
              />
              <span className="mt-4 flex cursor-default items-center text-sm font-medium text-gray-700 sm:text-base">
                Need to know about our courses.
                <a
                  href="#"
                  className="ml-1 font-bold text-blue-500 hover:underline">
                  Know More →
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
