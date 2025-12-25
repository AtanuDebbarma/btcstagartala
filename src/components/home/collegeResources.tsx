import {appStore} from '@/appStore/appStore';
import {resources} from '@/data/homeData/collegeReourcesData';
import type {CollegeResourcesTypes} from '@/types/homeTypes';
import {useNavigate} from 'react-router-dom';
import {useMemo, useState} from 'react';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {EditCollegeResourceModal} from './collegeResources/editCollegeResourceModal';
import type {CollegeResourceType} from '@/types/collegeResourcesTypes';

// Mapping between Firestore names and local data titles
const FIRESTORE_TO_TITLE_MAP: Record<string, string> = {
  Activities: 'Co-curricular Activities',
  Gallery: 'Gallery',
  Faculty: 'Our Faculty',
  Uniform: 'Students Uniform',
};

// Reverse mapping for getting Firestore name from title
const TITLE_TO_FIRESTORE_MAP: Record<string, string> = {
  'Co-curricular Activities': 'Activities',
  Gallery: 'Gallery',
  'Our Faculty': 'Faculty',
  'Students Uniform': 'Uniform',
};

export default function CollegeResources() {
  const nanvigation = useNavigate();
  const collegeResources = appStore(state => state.collegeResources);
  const user = appStore(state => state.user);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] =
    useState<CollegeResourceType | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  // Merge Firestore data with local data
  const mergedResources = useMemo(() => {
    return resources.map((localResource: CollegeResourcesTypes) => {
      // Find matching Firestore resource by title
      const firestoreResource = collegeResources.find(
        fbResource =>
          FIRESTORE_TO_TITLE_MAP[fbResource.name] === localResource.title,
      );

      // Use Firestore URL if available, otherwise fallback to local
      return {
        ...localResource,
        image: firestoreResource?.url || localResource.image,
        firestoreId: firestoreResource?.id,
        firestoreName: firestoreResource?.name,
      };
    });
  }, [collegeResources]);

  const handleNav = (url: string) => {
    setTimeout(() => {
      void nanvigation(url);
      scrollTo(0, 0);
    }, 200);
  };

  const handleEditModal = (resource: any) => {
    if (!resource.firestoreId) {
      alert('No Firestore document found for this resource!');
      return;
    }

    setSelectedResource({
      id: resource.firestoreId,
      name: resource.firestoreName || TITLE_TO_FIRESTORE_MAP[resource.title],
      url: resource.image,
    });

    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  return (
    <div className="container mx-auto mt-20 max-w-7xl px-10 py-8 xl:px-0">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          College Resources
          <span
            className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"
            aria-hidden="true"></span>
        </h2>
      </div>

      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        role="list">
        {mergedResources.map((resource: any, index) => {
          const isFaculty = resource.title === 'Our Faculty';

          return (
            <article
              key={index}
              className="transform-transform relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition duration-180 ease-in-out hover:-translate-y-1 hover:scale-105 active:scale-95"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="listitem">
              {/* Admin Edit Button */}
              {isAdmin && hoveredIndex === index && resource.firestoreId && (
                <div className="absolute top-2 right-2 z-50 flex items-center rounded-full bg-white px-3 py-2 shadow-md">
                  <AdminInteractionBtns
                    handleModal={() => handleEditModal(resource)}
                    iconClass="fa-solid fa-pen"
                    title="EDIT"
                    iconColor="text-blue-600"
                    hoverColor="hover:text-blue-800"
                  />
                </div>
              )}

              <div onClick={() => handleNav(resource.url)} className="relative">
                <img
                  src={resource.image}
                  alt={resource.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full ${isFaculty ? 'h-48 object-cover' : 'h-48'}`}
                />
                <div className="absolute inset-0 flex items-end justify-center bg-black/20">
                  <h3 className="p-4 text-xl font-bold text-amber-50">
                    {resource.title}
                  </h3>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {openModal && isAdmin && selectedResource && (
        <EditCollegeResourceModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedResource={selectedResource}
          setOnHover={() => setHoveredIndex(null)}
        />
      )}
    </div>
  );
}
