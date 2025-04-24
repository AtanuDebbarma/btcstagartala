import {NoticeType} from '@/types/homeTypes';
import {useNavigate} from 'react-router-dom';

export const NoticeItem = ({notice}: {notice: NoticeType}) => {
  return (
    <div className="mb-4 border-b border-gray-200 pb-4 last:border-0">
      <p className="text-gray-800">{notice.content}</p>
      {notice.name.includes('View') && (
        <a
          href={notice.url}
          className="mt-1 inline-flex items-center text-blue-500 hover:underline">
          → View
        </a>
      )}
    </div>
  );
};
interface Props {
  text: string;
  px?: string;
  url: string;
}

export const NavButton = ({text, px, url}: Props) => {
  const navigation = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer transition-transform duration-150 ease-in-out focus:outline-none active:scale-90">
      <div
        className={`bg-[#0a2540] py-4 text-white ${
          px ?? 'px-15 md:px-12'
        } rounded-sm text-center shadow-md`}>
        <h3 className="relative inline-block text-lg font-semibold tracking-wide text-nowrap uppercase">
          {text}
          <span className="absolute -bottom-1 left-1/4 mt-2 h-[3px] w-1/2 rounded bg-yellow-400"></span>
        </h3>
      </div>
    </button>
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
      <div className="flex min-h-[30px] flex-row items-center justify-center rounded-md bg-blue-500 p-3 text-white shadow md:min-h-[150px]">
        <p className="mb-1 text-sm font-semibold">More Accreditations</p>
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
    <div className="flex min-h-[150px] flex-col items-center justify-center rounded-md bg-white p-3 text-center shadow">
      <img
        src={logo}
        alt={name}
        className="mb-2 h-[65px] w-auto object-contain"
      />
      <p className="text-center text-sm text-gray-800">{name}</p>
    </div>
  );
};
