import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {getAlertBtnsConfig} from '@/helpers/alertHelpers/getAlertBtnConfig';
import type {AlertsType, CarouselModeType} from '@/types/homeTypes';
import type {Timestamp} from 'firebase/firestore';
import React from 'react';

interface PROPS {
  alert: AlertsType;
  handleModal: (
    type: CarouselModeType,
    id: string,
    title: string,
    content: string,
    fileName: string,
    fileURL: string,
    file_public_id: string,
    link1Name: string,
    link1Url: string,
    link2Name: string,
    link2Url: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const AlertAdminButtons = React.memo(({alert, handleModal}: PROPS) => {
  return (
    <td key={alert.id} className="px-4 py-1 sm:px-8 sm:py-3">
      <div className="flex flex-row justify-center">
        {getAlertBtnsConfig(alert, handleModal).map((btn, index) => (
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
});
