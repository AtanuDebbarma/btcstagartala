import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {getNoticeBtnsConfig} from '@/helpers/noticeTableHelpers.tsx/getNoticeBtnsConfig';
import {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import React from 'react';

interface PROPS {
  notice: NoticeBoardType;
  handleModal: (
    type: CarouselModeType,
    id: string,
    name: string,
    url: string,
    public_id: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const NoticeAdminButtons = React.memo(({notice, handleModal}: PROPS) => {
  return (
    <td key={notice.id} className="px-4 py-1 sm:px-8 sm:py-3">
      <div className="flex flex-row justify-center">
        {getNoticeBtnsConfig(notice, handleModal).map((btn, index) => (
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
