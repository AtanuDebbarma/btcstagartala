import {Assets} from '@/assets/assetData';
import {appStore} from '@/appStore/appStore';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {useState} from 'react';
import {EditSmallAboutCardModal} from './smallAboutCard/editSmallAboutCardModal';
import {EditSmallAboutCardImageModal} from './smallAboutCard/editSmallAboutCardImageModal';
import backupAboutCard from '../../assets/backupAboutCard.png';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/constants/routeNames';

export const SmallAboutCard = () => {
  const smallAboutCard = appStore(state => state.smallAboutCard);
  const smallAboutCardImage = appStore(state => state.smallAboutCardImage);
  const navigation = useNavigate();
  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onHoverImage, setOnHoverImage] = useState<boolean>(false);

  const rawText = `
Bharatiya Vidya Bhavan authority was requested by the
Government of Tripura to set up a college of Science &
Technology to teach non-conventional subjects that are not
being taught at other colleges in the State and that the
College would be self-financing. Accordingly, 4.88 acres of
land was made available at Anandanagar and a sum of rupees 50
lacs was also granted by the Government of Tripura at the
initial stage for development of the College. ONGC, Tripura
Asset also extended rupees 15 lacs for the development of the
college. Bhavan's Tripura College of Science & Technology
(BTCST) started its journey on 20th September, 2003. It was
inaugurated by Sri. Manik Sarkar, Hon'ble Chief Minister of
Tripura in the august presence of Late Dr. Pratap Chandra
Chunder, Ex-Chairman, BVB , Kolkata Kendra and Ex- Minister of
Education, Government of India and other state Government &
BVB functionaries.
`;

  const displayText = smallAboutCard?.text || rawText;

  const truncate = (text: string, limit = 150) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + ' ...';
  };

  const handleModal = () => {
    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  const handleImageModal = () => {
    setTimeout(() => {
      setOpenImageModal(true);
    }, 200);
  };

  const handleNav = (url: string) => {
    setTimeout(() => {
      navigation(url);
      scrollTo(0, 0);
    }, 200);
  };

  return (
    <div className="mt-20">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Our College at a Glance
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto mt-3 max-w-7xl px-10 xl:px-0">
        <div className="w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="flex flex-col gap-10 px-5 py-10 lg:flex-row lg:gap-0">
            {/* Left Content Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:px-5">
              <div
                className="relative"
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}>
                {isAdmin && onHover && smallAboutCard && (
                  <div className="absolute top-0 right-0 z-50 flex items-center rounded-full bg-white px-4 py-2 shadow-md">
                    <AdminInteractionBtns
                      handleModal={handleModal}
                      iconClass="fa-solid fa-pen"
                      title="EDIT"
                      iconColor="text-blue-600"
                      hoverColor="hover:text-blue-800"
                    />
                  </div>
                )}
                <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-2xl">
                  Bhavan's Tripura College of Science & Technology
                </h1>
                <p className="cursor-text text-justify text-sm leading-relaxed text-gray-700 sm:text-base">
                  {truncate(displayText)}
                </p>
              </div>
              <span className="mt-4 flex cursor-default items-center text-sm font-medium text-gray-700 sm:text-base">
                Need to know about us.
                <button
                  onClick={() => handleNav(RouteNames.ABOUT)}
                  className="ml-1 cursor-pointer font-bold text-[#900090] hover:underline">
                  Know More →
                </button>
              </span>
            </div>

            {/* Right Image Section */}
            <div className="flex flex-col justify-between px-6 md:mr-20 md:ml-20 md:w-[80%] md:px-2 lg:mr-auto lg:ml-auto lg:justify-center lg:px-5">
              <div
                className="relative"
                onMouseEnter={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}>
                {isAdmin && onHoverImage && smallAboutCardImage && (
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
                  src={
                    smallAboutCardImage?.url ||
                    Assets.link.aboutShortImg ||
                    backupAboutCard
                  }
                  alt="College Image"
                  className="h-auto max-h-[350px] w-full rounded-md object-cover"
                />
              </div>
              <span className="mt-4 flex cursor-default items-center text-sm font-medium text-gray-700 sm:text-base">
                Need to know about our courses.
                <button
                  onClick={() => handleNav(RouteNames.ACADEMICS)}
                  className="ml-1 cursor-pointer font-bold text-[#900090] hover:underline">
                  Know More →
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {openModal && isAdmin && smallAboutCard && (
        <EditSmallAboutCardModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedCard={smallAboutCard}
          setOnHover={setOnHover}
        />
      )}
      {openImageModal && isAdmin && smallAboutCardImage && (
        <EditSmallAboutCardImageModal
          openModal={openImageModal}
          setOpenModal={setOpenImageModal}
          selectedImage={smallAboutCardImage}
          setOnHoverImage={setOnHoverImage}
        />
      )}
    </div>
  );
};
