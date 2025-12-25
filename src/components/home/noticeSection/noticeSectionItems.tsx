import type {NoticeBoardType} from '@/types/homeTypes';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export const NoticeItem = React.memo(({notice}: {notice: NoticeBoardType}) => {
  const timeStamptoDate = convertFirebaseTimestampToDate(notice.createdAt);
  const navigation = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${notice.url}`);
    }, 200);
  };

  return (
    <div
      onClick={handleClick}
      className="group mb-4 grid h-full w-full cursor-pointer grid-cols-1 gap-2 border-gray-200 px-4 pb-4 transition-transform duration-180 ease-in-out last:border-0 active:scale-95 sm:grid-cols-12">
      {/* Notice Name (takes 8/12 cols on sm+) */}
      <div className="sm:col-span-8">
        <p className="wrap-break-words text-gray-800 transition-colors duration-180 ease-in-out group-hover:text-blue-800 group-hover:underline">
          {notice.name}
        </p>
      </div>

      {/* Date (takes 4/12 cols on sm+) */}
      <div className="sm:col-span-4 sm:text-right">
        <p className="text-nowrap text-gray-800">{timeStamptoDate}</p>
      </div>
    </div>
  );
});
interface Props {
  text: string;
  url: string;
}

export const NavButton = React.memo(({text, url}: Props) => {
  const navigation = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };
  return (
    <button
      onClick={handleClick}
      className="w-full min-w-62.5 cursor-pointer transition-transform duration-180 ease-in-out focus:outline-none active:scale-95">
      <div
        className={`rounded-sm bg-[#3f003f] px-4 py-4 text-center text-white shadow-md`}>
        <h3 className="relative inline-block text-lg font-semibold tracking-wide text-nowrap uppercase">
          {text}
          <span className="absolute -bottom-1 left-1/4 mt-2 h-0.75 w-1/2 rounded bg-yellow-400"></span>
        </h3>
      </div>
    </button>
  );
});

export const AccreditationCard = React.memo(
  ({
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
        <div className="flex min-h-7.5 flex-row items-center justify-center rounded-md bg-[#900090] p-3 text-white shadow md:min-h-37.5">
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
      <div className="flex min-h-37.5 flex-col items-center justify-center rounded-md bg-white p-3 text-center shadow">
        <img
          src={logo}
          alt={name}
          className="mb-2 h-16.25 w-auto object-contain"
        />
        <p className="text-center text-sm text-gray-800">{name}</p>
      </div>
    );
  },
);
