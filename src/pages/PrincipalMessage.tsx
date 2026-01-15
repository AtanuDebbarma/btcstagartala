import {appStore} from '@/appStore/appStore';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {useState} from 'react';
import {EditPrincipalTextModal} from '@/components/principal/editPrincipalTextModal';
import {EditPrincipalImageModal} from '@/components/principal/editPrincipalImageModal';
import {useFetchPrincipalData} from '@/services/textServices/fetchPrincipalData';
import {Assets} from '../assets/assetData';

const PrincipalMESSAGE = () => {
  useFetchPrincipalData(); // Fetch principal data only when this page is mounted

  const principalText = appStore(state => state.principalText);
  const principalImage = appStore(state => state.principalImage);
  const user = appStore(state => state.user);

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openTextModal, setOpenTextModal] = useState<boolean>(false);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [onHoverText, setOnHoverText] = useState<boolean>(false);
  const [onHoverImage, setOnHoverImage] = useState<boolean>(false);

  const fallbackText = `Bhavan's Tripura College of Science & Technology, is a new
                  entrant in the field of higher education in Tripura.
                  Established in 2003 the college is persistently striving to
                  achieve value-based education system that sincerely aspire to
                  produce new generations of competent and a acdemically
                  motivated students. At present the college offers BBA
                  (Bachelor of Business Administration), B.Sc. in Information
                  Technology (BIT), B.Sc. Honours in Computer Science & B.Sc.
                  Honours in Electronics, B. Sc. in Medical Lab. Technology, B.
                  Sc. (H) in Physics, Mathematics and B.A.(H) in English.
                  Bhavan's family focuses on capitalizing the Indian heritage
                  and culture for creating a finer ambience of value-based
                  education that caters to learner centric approach. Based on no
                  profit no loss principle the college look forward, to the
                  spirit of nations building. We have a long road to travel. But
                  we are inspired by the student sense of dedication that
                  motivates us to reap benefits for the society in the days to
                  come.`;

  const fallbackFooter =
    "Principal - Bhavan's Tripura College of Science & Technology";

  const displayText = principalText?.text || fallbackText;
  const displayFooter = principalText?.bold_footer || fallbackFooter;
  const displayImage =
    principalImage?.url ||
    'https://www.btcstagartala.org/wp-content/uploads/2024/05/WhatsApp_Image_2024-05-16_at_6.55.25_PM-removebg-preview.png';

  const handleTextModal = () => {
    setTimeout(() => {
      setOpenTextModal(true);
    }, 200);
  };

  const handleImageModal = () => {
    setTimeout(() => {
      setOpenImageModal(true);
    }, 200);
  };

  return (
    <div className="mt-20">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Principal's Message
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto mt-3 max-w-7xl px-10 xl:px-0">
        <div className="w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="flex flex-col gap-10 px-5 py-10 lg:flex-row lg:gap-0">
            {/* Left Image Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:justify-center lg:px-5">
              <div
                className="relative"
                onMouseEnter={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}>
                {isAdmin && onHoverImage && (
                  <div className="absolute top-0 right-0 z-50 flex items-center rounded-full bg-white px-4 py-2 shadow-md">
                    <AdminInteractionBtns
                      handleModal={handleImageModal}
                      iconClass="fa-solid fa-pen"
                      title="EDIT"
                      iconColor="text-blue-600"
                      hoverColor="hover:text-blue-800"
                    />
                  </div>
                )}
                <img
                  src={displayImage || Assets.link.Principal_Fallback}
                  alt="Principal Image"
                  className="h-auto max-h-87.5 w-full rounded-md object-contain"
                />
              </div>
            </div>
            {/* Right Content Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:px-5">
              <div
                className="relative"
                onMouseEnter={() => setOnHoverText(true)}
                onMouseLeave={() => setOnHoverText(false)}>
                {isAdmin && onHoverText && (
                  <div className="absolute top-0 right-0 z-50 flex items-center rounded-full bg-white px-4 py-2 shadow-md">
                    <AdminInteractionBtns
                      handleModal={handleTextModal}
                      iconClass="fa-solid fa-pen"
                      title="EDIT"
                      iconColor="text-blue-600"
                      hoverColor="hover:text-blue-800"
                    />
                  </div>
                )}
                <p className="text-justify text-sm leading-relaxed text-gray-700 sm:text-base">
                  {displayText}
                </p>
                <p className="text-md mt-4 mb-4 font-medium text-gray-800">
                  "{displayFooter}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openTextModal && isAdmin && (
        <EditPrincipalTextModal
          openModal={openTextModal}
          setOpenModal={setOpenTextModal}
          selectedData={principalText}
          setOnHover={setOnHoverText}
        />
      )}
      {openImageModal && isAdmin && (
        <EditPrincipalImageModal
          openModal={openImageModal}
          setOpenModal={setOpenImageModal}
          selectedImage={principalImage}
          setOnHoverImage={setOnHoverImage}
        />
      )}
    </div>
  );
};

export default PrincipalMESSAGE;
