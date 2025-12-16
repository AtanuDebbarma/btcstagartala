import {accreditations} from '@/data/homeData/noticeSectionData';
import {AccreditationCard, NoticeItem} from './noticeSectionItems';
import {Accreditation, NoticeBoardType} from '@/types/homeTypes';
import {ProspectusButtons} from './prospectusButtons';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/constants/routeNames';
import {appStore} from '@/appStore/appStore';

export const NoticeSection = () => {
  const navigation = useNavigate();

  const notices = appStore(state => state.notices);

  const handleNoticeTablePress = () => {
    setTimeout(() => {
      navigation(RouteNames.NOTICE_BOARD);
      scrollTo(0, 0);
    }, 200);
  };

  // Sort notices by createdAt (recent first)
  const sortedNotices = [...notices].sort(
    (a: NoticeBoardType, b: NoticeBoardType) => {
      if (!a.createdAt || !b.createdAt) return 0; // fallback if createdAt missing
      return b.createdAt.toMillis() - a.createdAt.toMillis(); // Firestore Timestamp to millis
    },
  );

  return (
    <section className="mt-12 w-full bg-gray-100 p-4 lg:mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:gap-18 lg:flex-row lg:gap-15">
          {/* Left Column: NavButtons + Accreditations */}
          <div className="flex w-full flex-col items-center gap-6 lg:items-start">
            {/* Nav Buttons Row */}

            <ProspectusButtons />

            {/* Recognitions & Accreditations Section */}
            <div className="mt-2">
              <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
                Recognitions & Accreditations
                <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {accreditations.map((item: Accreditation) => (
                  <AccreditationCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Notice Board */}
          <div className="flex w-full md:mr-[10%] md:ml-[10%] md:w-[80%] lg:mr-0 lg:ml-0">
            <div className="h-fit w-full rounded-lg border-2 border-[#0a2540] bg-white shadow-md">
              <div className="rounded-t-sm bg-[#3f003f] px-8 py-4 text-center text-white shadow-md">
                <h3 className="relative inline-block text-lg font-semibold tracking-wide uppercase">
                  Notice Board
                  <span className="absolute -bottom-1 left-1/4 mt-2 h-0.75 w-1/2 rounded bg-yellow-400"></span>
                </h3>
              </div>
              <div className="px-3 py-4">
                <div className="max-h-96 overflow-y-auto">
                  {sortedNotices.length > 0 ? (
                    sortedNotices
                      .slice(0, 10)
                      .map((notice: NoticeBoardType) => (
                        <div
                          key={notice.id}
                          className="h-full w-full border-b bg-gray-200 pt-4 hover:bg-gray-400">
                          <NoticeItem notice={notice} />
                        </div>
                      ))
                  ) : (
                    <div className="flex h-full w-full items-center justify-center py-10 text-center text-gray-800">
                      To Be Announced
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="mx-auto mt-6 flex w-full cursor-pointer items-center justify-center bg-purple-200 px-6 py-2 font-semibold text-purple-800 shadow-sm transition-transform duration-180 ease-in-out hover:bg-purple-300 active:scale-95"
                    onClick={handleNoticeTablePress}>
                    View All Notice
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
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
    </section>
  );
};
