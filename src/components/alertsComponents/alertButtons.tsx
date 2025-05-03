import {AlertsType} from '@/types/homeTypes';
import React from 'react';
import {useNavigate} from 'react-router-dom';

interface PROPS {
  alert: AlertsType;
}

export const AlertButtons = React.memo(({alert}: PROPS) => {
  const navigation = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigation(`/alerts/${alert.id}/${alert.title}}`);
      scrollTo(0, 0);
    }, 200);
  };

  return (
    <>
      <td className="px-4 py-1 sm:px-8 sm:py-3">
        <div className="flex justify-center gap-2">
          <button
            title="View"
            onClick={handleClick}
            className="cursor-pointer rounded bg-blue-500 p-2 text-white transition-transform duration-180 ease-in-out active:scale-95">
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
      </td>
    </>
  );
});
