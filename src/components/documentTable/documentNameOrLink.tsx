import React from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
  name: string;
  url: string;
  isAdmin: boolean;
}

export const DocumentNameOrLink = React.memo(({isAdmin, name, url}: Props) => {
  const navigation = useNavigate();

  const handleClick = (url: string) => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };

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
