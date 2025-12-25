import React from 'react';
import {useNavigate} from 'react-router-dom';

interface PROPS {
  title: string;
  id: string;
  isAdmin: boolean;
}

export const AlertNameOrLink = React.memo(({isAdmin, title, id}: PROPS) => {
  const navigation = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      void navigation(`/alerts/${id}/${title}`);
      scrollTo(0, 0);
    }, 200);
  };
  // const {width} = useWindowSize();
  // const displayName = useMemo(() => getTrimmedName(name, width), [name, width]);

  const RenderNameOrLink = () => {
    if (!isAdmin) {
      return (
        <td className="wrap-break-words px-2 py-3 text-start font-medium sm:px-4">
          {title}
        </td>
      );
    } else {
      return (
        <td className="px-2 py-3 font-medium text-[#900090] sm:px-4">
          <button
            className="wrap-break-words cursor-pointer text-start underline transition-transform duration-180 ease-in-out hover:text-purple-800 active:scale-95"
            onClick={handleClick}>
            {title}
          </button>
        </td>
      );
    }
  };

  return <>{RenderNameOrLink()}</>;
});
