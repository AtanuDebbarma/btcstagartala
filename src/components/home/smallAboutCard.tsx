import {Assets} from '@/assets/assetData';

export const SmallAboutCard = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-10 xl:px-0">
      <div className="w-full bg-gray-50 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row px-5 py-10 gap-10 lg:gap-0 ">
          {/* Left Content Section */}
          <div className="px-6 md:px-2 lg:px-5 md:w-[80%] flex flex-col justify-between md:ml-20 md:mr-20 lg:ml-auto lg:mr-auto">
            <div>
              <h1 className="text-2xl sm:text-2xl font-bold text-gray-800 mb-4">
                Bhavan’s Tripura College of Science & Technology
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                Bharatiya Vidya Bhavan authority was requested by the Government
                of Tripura to set up a college of Science & Technology to teach
                non-conventional subjects that are not being taught at other
                colleges in the State and that the College would be
                self-financing. Accordingly, 4.88 acres of land was made
                available at Anandanagar and a sum of rupees 50 lacs was also
                granted by the Government of Tripura at the initial stage for
                development of the College. ONGC, Tripura Asset also extended
                rupees 15 lacs for the development of the college. Bhavan’s
                Tripura College of Science & Technology (BTCST) started its
                journey on 20th September, 2003. It was inaugurated by Sri.
                Manik Sarkar, Hon’ble Chief Minister of Tripura in the august
                presence of Late Dr. Pratap Chandra Chunder, Ex-Chairman, BVB ,
                Kolkata Kendra and Ex- Minister of Education, Government of
                India and other state Government & BVB functionaries.
              </p>
            </div>
            <span className="mt-4 text-sm sm:text-base text-gray-700 font-medium flex items-center cursor-default">
              Need to know about our campus.
              <a
                href="#"
                className="ml-1 text-blue-500 font-bold hover:underline">
                Know More →
              </a>
            </span>
          </div>

          {/* Right Image Section */}
          <div className="px-6  md:px-2 lg:px-5 md:w-[80%] md:ml-20 md:mr-20 lg:ml-auto lg:mr-auto flex flex-col justify-between lg:justify-center">
            <img
              src={Assets.link.aboutShortImg}
              alt="College Image"
              className="w-full h-auto max-h-[350px] object-cover rounded-md"
            />
            <span className="mt-4 text-sm sm:text-base text-gray-700 font-medium flex items-center cursor-default">
              Need to know about our courses.
              <a
                href="#"
                className="ml-1 text-blue-500 font-bold hover:underline">
                Know More →
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
