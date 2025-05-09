import React from 'react';

type PROPS = {
  handleModal: (any: any) => void;
  iconClass: 'fa-solid fa-pen' | 'fa-solid fa-trash' | 'fa-solid fa-plus';
  title: 'EDIT' | 'DELETE' | 'ADD';
  iconColor: string;
  hoverColor: string;
  iconSize?: string;
};
export const AdminInteractionBtns = React.memo(
  ({
    handleModal,
    iconClass,
    title,
    iconColor,
    hoverColor,
    iconSize = 'text-lg',
  }: PROPS) => {
    return (
      <div className="flex w-full items-center transition-transform duration-150 ease-in-out active:scale-90">
        <button
          onClick={handleModal}
          title={title}
          className="group cursor-pointer rounded-full p-0 focus:outline-none">
          <i
            className={`${iconClass} ${iconSize} ${iconColor} transition-all duration-200 ${hoverColor} group-active:scale-90`}
          />
        </button>
      </div>
    );
  },
);
