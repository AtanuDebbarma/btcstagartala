import {
  Accreditation,
  accreditations,
  notices,
  NoticeType,
} from '@/data/noticeSectionData';
import {NavButton, AccreditationCard, NoticeItem} from './noticeSectionItems';

export const NoticeSection = () => {
  return (
    <div className="w-full bg-gray-100  p-4 lg:mt-20 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-15 md:gap-18">
          {/* Left Column: NavButtons + Accreditations */}
          <div className="w-full flex items-center lg:items-start flex-col gap-6">
            {/* Nav Buttons Row */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-20 xl:gap-40 lg:gap-18">
              <NavButton text="PROSPECTUS" px="px-18 md:px-17" />
              <NavButton text="ADMISSION FORM" />
            </div>

            {/* Recognitions & Accreditations Section */}
            <div className="mt-2">
              <h2 className="text-2xl font-bold mb-6 relative inline-block tracking-wide">
                Recognitions & Accreditations
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-yellow-400 rounded"></span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accreditations.map((item: Accreditation) => (
                  <AccreditationCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Notice Board */}
          <div className="flex w-full md:w-[80%] md:ml-[10%] md:mr-[10%] lg:ml-0 lg:mr-0">
            <div className="w-full bg-white rounded-lg shadow-md h-fit border-2 border-[#0a2540]">
              <div className="bg-[#0a2540] text-white py-4 px-8 rounded-t-sm shadow-md text-center">
                <h3 className="text-lg font-semibold uppercase relative inline-block tracking-wide">
                  Notice Board
                  <span className="mt-2 absolute -bottom-1 left-1/4 w-1/2 h-[3px] bg-yellow-400 rounded"></span>
                </h3>
              </div>
              <div className="p-4">
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                  {notices.map((notice: NoticeType) => (
                    <NoticeItem key={notice.id} notice={notice} />
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <button className="w-full mx-auto mt-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-6 shadow-sm flex items-center justify-center">
                    View All Notice
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
