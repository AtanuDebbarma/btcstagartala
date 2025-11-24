import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {appStore} from '@/appStore/appStore';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {useState} from 'react';
import {ProspectusModal} from '../home/noticeSection/prospectusModal';
import {useNavigate} from 'react-router-dom';

export const AcademicsInfoButton = () => {
  const prospectusAndAdmission: ProspectusAndAdmissionFormType[] | [] =
    appStore(state => state.prospectusAndAdmission);
  const user = appStore(state => state.user);
  const navigation = useNavigate();

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [selectedPDF, setSelectedPDF] =
    useState<ProspectusAndAdmissionFormType | null>(null);

  const handleModal = (
    id: string,
    url: string,
    name: 'More_Academics_Info',
    public_id: string,
    createdAt: Timestamp | null,
  ) => {
    setTimeout(() => {
      setOpenModal(true);
      setSelectedPDF({id, url, name, public_id, createdAt});
    }, 200);
  };

  const handleClick = (url: string) => {
    setTimeout(() => {
      navigation(`/pdf-viewer?file=${url}`);
      scrollTo(0, 0);
    }, 200);
  };

  // Find the "More_Academics_Info" document
  const academicsInfo = prospectusAndAdmission.find(
    item => item.name === 'More_Academics_Info',
  );

  if (!academicsInfo) {
    return null; // Don't render if document doesn't exist
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        {isAdmin && onHover && (
          <div className="absolute top-0 right-0.5 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white px-4 py-2 shadow-md">
            <AdminInteractionBtns
              handleModal={() =>
                handleModal(
                  academicsInfo.id,
                  academicsInfo.url,
                  'More_Academics_Info',
                  academicsInfo.public_id,
                  academicsInfo.createdAt,
                )
              }
              iconClass="fa-solid fa-pen"
              title="EDIT"
              iconColor="text-blue-600"
              hoverColor="hover:text-blue-800"
            />
          </div>
        )}
        <button
          onClick={() => handleClick(academicsInfo.url)}
          className="mb-10 w-[20%] min-w-[300px] cursor-pointer transition-transform duration-180 ease-in-out focus:outline-none active:scale-95">
          <div className="rounded-sm bg-[#900090] px-4 py-4.5 text-center text-white shadow-md">
            <h3 className="relative inline-block text-lg font-semibold tracking-wide uppercase">
              More Academics Info
              <span className="absolute -bottom-1 left-1/4 mt-2 h-[3px] w-1/2 rounded bg-yellow-400"></span>
            </h3>
          </div>
        </button>
      </div>
      {openModal && isAdmin && (
        <ProspectusModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedPDF={selectedPDF}
          totalCount={prospectusAndAdmission.length}
          setOnHoverProspectus={setOnHover}
          setOnHoverAdmission={setOnHover}
        />
      )}
    </div>
  );
};
