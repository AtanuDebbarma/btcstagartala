import {RouteNames} from '@/constants/routeNames';
import {useNavigate} from 'react-router-dom';

export const QuickAccess = () => {
  const links = [
    {title: 'IQAC', url: RouteNames.IQAC},
    {title: 'Committee & Cells', url: RouteNames.COMMITTEE_CELLS},
    {
      title: 'Directorate of Higher Education of Tripura',
      url: RouteNames.DHE,
    },
    {title: 'Academic Calendar', url: RouteNames.ACADEMIC_CALENDAR},
    {title: 'AICTE', url: RouteNames.AICTE},
    {title: 'Admission', url: RouteNames.ADMISSION_ELIGIBILITY},
    {title: 'Misc Documents', url: RouteNames.MISC_DOCUMENTS},
    {title: 'Academic Module', url: RouteNames.ACADEMICS},
    {title: 'Help Desk', url: RouteNames.HELP_DESK},
    {title: 'AISHE', url: RouteNames.AISHE},
    {title: 'Alerts', url: RouteNames.ALERTS},
    {title: 'Gallery', url: RouteNames.GALLERY},
  ];
  const nanvigation = useNavigate();

  const handleNav = (url: string) => {
    setTimeout(() => {
      void nanvigation(url);
      scrollTo(0, 0);
    }, 200);
  };

  return (
    <section className="mt-5 flex w-full flex-col items-center justify-center">
      <div className="flex w-[70%] flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Quick Access</h2>
        </div>
        <div className="relative">
          <div className="absolute top-0 -left-1 h-1 w-32 rounded-full bg-yellow-400"></div>
        </div>
      </div>
      <div className="mt-5 w-[70%] rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col">
          <div
            className={`xs:grid-cols-2 mt-6 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4`}>
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNav(link.url)}
                className="transform-transform cursor-pointer rounded-md bg-purple-200 px-4 py-3 text-center text-purple-800 transition-all duration-180 ease-in-out hover:bg-purple-300 active:scale-95">
                {link.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
