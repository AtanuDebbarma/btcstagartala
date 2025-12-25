import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {appStore} from '@/appStore/appStore';
import type {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import {NavButton} from './noticeSectionItems';
import type {Timestamp} from 'firebase/firestore';
import {useState} from 'react';
import {ProspectusModal} from './prospectusModal';

export const ProspectusButtons = () => {
  const prospectusAndAdmission: ProspectusAndAdmissionFormType[] | [] =
    appStore(state => state.prospectusAndAdmission);
  const user = appStore(state => state.user);

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [onHoverProspectus, setOnHoverProspectus] = useState<boolean>(false);
  const [onHoverAdmission, setOnHoverAdmission] = useState<boolean>(false);
  const [selectedPDF, setSelectedPDF] =
    useState<ProspectusAndAdmissionFormType | null>(null);

  const handleModal = (
    id: string,
    url: string,
    name: 'Prospectus' | 'Admission_Form',
    public_id: string,
    createdAt: Timestamp | null,
  ) => {
    setTimeout(() => {
      setOpenModal(true);
      setSelectedPDF({id, url, name, public_id, createdAt});
    }, 200);
  };

  const RenderProspectus = () => {
    return prospectusAndAdmission.map(
      (item: ProspectusAndAdmissionFormType, index) => {
        if (item.name === 'Prospectus') {
          return (
            <div
              key={item.id || `prospectus-${index}`}
              className="relative"
              onMouseEnter={() => setOnHoverProspectus(true)}
              onMouseLeave={() => setOnHoverProspectus(false)}>
              {isAdmin &&
                onHoverProspectus &&
                prospectusAndAdmission &&
                prospectusAndAdmission.length !== 0 && (
                  <div className="absolute top-0 right-0.5 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white px-4 py-2 shadow-md">
                    <AdminInteractionBtns
                      handleModal={() =>
                        handleModal(
                          item.id,
                          item.url,
                          item.name === 'Prospectus' ? item.name : 'Prospectus',
                          item.public_id,
                          item.createdAt,
                        )
                      }
                      iconClass="fa-solid fa-pen"
                      title="EDIT"
                      iconColor="text-blue-600"
                      hoverColor="hover:text-blue-800"
                    />
                  </div>
                )}
              <NavButton
                key={item.id || `prospectus-${index}`}
                text="PROSPECTUS"
                url={item.url}
              />
            </div>
          );
        } else if (item.name === 'Admission_Form') {
          return (
            <div
              key={item.id || `admission-${index}`}
              className="relative"
              onMouseEnter={() => setOnHoverAdmission(true)}
              onMouseLeave={() => setOnHoverAdmission(false)}>
              {isAdmin &&
                onHoverAdmission &&
                prospectusAndAdmission &&
                prospectusAndAdmission.length !== 0 && (
                  <div className="absolute top-0 right-0.5 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white px-4 py-2 shadow-md">
                    <AdminInteractionBtns
                      handleModal={() =>
                        handleModal(
                          item.id,
                          item.url,
                          item.name === 'Admission_Form'
                            ? item.name
                            : 'Admission_Form',
                          item.public_id,
                          item.createdAt,
                        )
                      }
                      iconClass="fa-solid fa-pen"
                      title="EDIT"
                      iconColor="text-blue-600"
                      hoverColor="hover:text-blue-800"
                    />
                  </div>
                )}
              <NavButton
                key={item.id || `admission-${index}`}
                text="ADMISSION FORM"
                url={item.url}
              />
            </div>
          );
        }
        return null; // Return null for items that don't match any condition
      },
    );
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-20 lg:gap-18 xl:gap-40">
      {RenderProspectus()}
      {openModal && isAdmin && (
        <ProspectusModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedPDF={selectedPDF}
          totalCount={prospectusAndAdmission.length}
          setOnHoverProspectus={setOnHoverProspectus}
          setOnHoverAdmission={setOnHoverAdmission}
        />
      )}
    </div>
  );
};
