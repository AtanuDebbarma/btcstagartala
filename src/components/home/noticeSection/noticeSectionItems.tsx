import {NoticeType} from '@/types/homeTypes';

export const NoticeItem = ({notice}: {notice: NoticeType}) => {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-0">
      <p className="text-gray-800">{notice.content}</p>
      {notice.name.includes('View') && (
        <a
          href={notice.url}
          className="text-blue-500 hover:underline inline-flex items-center mt-1">
          → View
        </a>
      )}
    </div>
  );
};

export const NavButton = ({text, px}: {text: string; px?: string}) => {
  return (
    <div>
      <div
        className={`bg-[#0a2540] text-white py-4 ${
          px ?? 'px-15 md:px-12'
        } rounded-sm shadow-md text-center`}>
        <h3 className="text-lg font-semibold uppercase relative inline-block tracking-wide text-nowrap">
          {text}
          <span className="mt-2 absolute -bottom-1 left-1/4 w-1/2 h-[3px] bg-yellow-400 rounded"></span>
        </h3>
      </div>
    </div>
  );
};

export const AccreditationCard = ({
  name,
  logo,
  isMoreButton,
}: {
  name: string;
  logo: string;
  isMoreButton?: boolean;
}) => {
  if (isMoreButton) {
    return (
      <div className="bg-blue-500 text-white p-3 rounded-md shadow flex flex-row justify-center items-center min-h-[30px] md:min-h-[150px]">
        <p className="font-semibold text-sm mb-1">More Accreditations</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-md shadow flex flex-col items-center justify-center text-center min-h-[150px]">
      <img
        src={logo}
        alt={name}
        className="w-auto h-[65px] mb-2 object-contain"
      />
      <p className="text-sm text-gray-800 text-center">{name}</p>
    </div>
  );
};
