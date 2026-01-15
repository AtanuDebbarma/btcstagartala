import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import React from 'react';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
  order?: number;
  public_id?: string;
};

interface Props {
  document: DocumentType;
  handleModal: (
    type: 'ADD' | 'EDIT' | 'DELETE',
    document?: DocumentType,
  ) => void;
}

export const DocumentAdminButtons = React.memo(
  ({document, handleModal}: Props) => {
    const buttons: Array<{
      title: 'ADD' | 'EDIT' | 'DELETE';
      iconClass: 'fa-solid fa-plus' | 'fa-solid fa-pen' | 'fa-solid fa-trash';
      iconColor: string;
      hoverColor: string;
      onClick: () => void;
    }> = [
      {
        title: 'ADD',
        iconClass: 'fa-solid fa-plus',
        iconColor: 'text-green-600',
        hoverColor: 'hover:text-green-800',
        onClick: () => handleModal('ADD'),
      },
      {
        title: 'EDIT',
        iconClass: 'fa-solid fa-pen',
        iconColor: 'text-blue-600',
        hoverColor: 'hover:text-blue-800',
        onClick: () => handleModal('EDIT', document),
      },
      {
        title: 'DELETE',
        iconClass: 'fa-solid fa-trash',
        iconColor: 'text-red-600',
        hoverColor: 'hover:text-red-800',
        onClick: () => handleModal('DELETE', document),
      },
    ];

    return (
      <td key={document.id} className="px-4 py-1 sm:px-8 sm:py-3">
        <div className="flex flex-row justify-center">
          {buttons.map((btn, index) => (
            <React.Fragment key={btn.title}>
              <AdminInteractionBtns
                handleModal={btn.onClick}
                iconClass={btn.iconClass}
                title={btn.title}
                iconColor={btn.iconColor}
                hoverColor={btn.hoverColor}
                iconSize="text-sm sm:text-lg"
              />
              {index < 2 && (
                <div className="mx-3 h-5 border-r border-gray-600"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </td>
    );
  },
);
