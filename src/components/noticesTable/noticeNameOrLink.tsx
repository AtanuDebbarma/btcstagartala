import React from 'react';
import {useNavigate} from 'react-router-dom';

interface PROPS {
  name: string;
  url: string;
  isAdmin: boolean;
}

export const NoticeNameOrLink = React.memo(({isAdmin, name, url}: PROPS) => {
  const navigation = useNavigate();

  const handleClick = (url: string) => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };
  // const {width} = useWindowSize();
  // const displayName = useMemo(() => getTrimmedName(name, width), [name, width]);

  const RenderNameOrLink = () => {
    if (!isAdmin) {
      return (
        <td className="wrap-break-words px-2 py-3 text-start font-medium sm:px-4">
          {name}
        </td>
      );
    } else {
      return (
        <td className="px-2 py-3 font-medium text-[#900090] sm:px-4">
          <button
            className="wrap-break-words cursor-pointer text-start underline transition-transform duration-180 ease-in-out hover:text-purple-800 active:scale-95"
            onClick={() => handleClick(url)}>
            {name}
          </button>
        </td>
      );
    }
  };

  return <>{RenderNameOrLink()}</>;
});

// const getTrimmedName = (name: string, width: number): string => {
//   let limit: number | null = null;

//   if (width >= 1200) {
//     return name; // no limit
//   } else if (width >= 900) {
//     limit = 87;
//   } else if (width >= 700) {
//     limit = 50;
//   } else {
//     limit = 22;
//   }

//   if (name.length > limit) {
//     return name.substring(0, limit).trimEnd() + '...';
//   }

//   return name;
// };
