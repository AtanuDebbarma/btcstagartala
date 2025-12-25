import {
  usePrincipal,
  useProfessors,
  useNonTeachingStaff,
  useGuestFaculty,
} from '@/services/faculty/useFaculty';
import type {FacultyWithId, FacultyType} from '@/types/otherTypes';
import {appStore} from '@/appStore/appStore';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {useState} from 'react';
import {EditFacultyModal} from './editFacultyModal';
import {DeleteFacultyModal} from './deleteFacultyModal';
import {AddFacultyModal} from './addFacultyModal';

export const FacultyCard = ({
  profile,
  onUpdate,
}: {
  profile: FacultyWithId;
  onUpdate: () => void;
}) => {
  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [onHover, setOnHover] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleEdit = () => {
    setTimeout(() => {
      setOpenEditModal(true);
    }, 200);
  };

  const handleDelete = () => {
    setTimeout(() => {
      setOpenDeleteModal(true);
    }, 200);
  };

  return (
    <>
      <div
        className={`relative w-full max-w-62.5 overflow-hidden rounded-md bg-white shadow-md`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        {isAdmin && onHover && (
          <div className="absolute top-2 right-2 z-50 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md">
            <AdminInteractionBtns
              handleModal={handleEdit}
              iconClass="fa-solid fa-pen"
              title="EDIT"
              iconColor="text-blue-600"
              hoverColor="hover:text-blue-800"
            />
            <AdminInteractionBtns
              handleModal={handleDelete}
              iconClass="fa-solid fa-trash"
              title="DELETE"
              iconColor="text-red-600"
              hoverColor="hover:text-red-800"
            />
          </div>
        )}
        <div className="relative rounded-md pt-2">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-48 w-full rounded-md object-contain"
          />
          <div className="absolute bottom-0 left-0 bg-blue-500 px-4 py-1 font-medium text-white">
            {profile.position}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-center text-lg font-bold">{profile.name}</h3>
          <div className="mt-3 text-center wrap-break-word">
            {profile.degrees && (
              <p className="text-md text-left font-medium text-gray-700">
                {profile.degrees}
              </p>
            )}
            <p className="text-left text-sm text-gray-600">
              <strong>Designation:</strong> {profile.details.designation}
            </p>
            {profile.details.category && (
              <p className="text-left text-sm text-gray-600">
                <strong>Category:</strong> {profile.details.category}
              </p>
            )}
            <p className="text-left text-sm text-gray-600">
              <strong>Address:</strong> {profile.details.address}
            </p>
            <p className="text-left text-sm text-gray-600">
              <strong>Contact:</strong> {profile.details.contact}
            </p>
            {profile.details.email && (
              <p className="text-left text-sm text-gray-600">
                <strong>Email:</strong> {profile.details.email}
              </p>
            )}
          </div>
        </div>
      </div>
      {openEditModal && isAdmin && (
        <EditFacultyModal
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
          onSuccess={onUpdate}
          facultyData={profile}
        />
      )}
      {openDeleteModal && isAdmin && (
        <DeleteFacultyModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          onSuccess={onUpdate}
          facultyId={profile.id}
          facultyName={profile.name}
        />
      )}
    </>
  );
};

export function FacultyProfile() {
  const {
    faculty: principalData,
    loading: principalLoading,
    refetch: refetchPrincipal,
  } = usePrincipal();
  const {
    faculty: professorsData,
    loading: professorsLoading,
    refetch: refetchProfessors,
  } = useProfessors();

  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [addType, setAddType] = useState<FacultyType>('professor');

  const handleAddProfessor = () => {
    setAddType('professor');
    setTimeout(() => {
      setOpenAddModal(true);
    }, 200);
  };

  const handleRefresh = () => {
    void refetchPrincipal();
    void refetchProfessors();
  };

  if (principalLoading || professorsLoading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-2">Loading faculty data...</p>
      </div>
    );
  }

  const principal = principalData[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Principal Section */}
      {principal && (
        <div className="mb-12 text-center">
          <h1 className="mb-1 text-3xl font-bold">Principal</h1>
          <p className="mb-8 text-gray-600">Principal</p>
          <div className="mx-auto flex max-w-md flex-col items-center justify-center">
            <FacultyCard profile={principal} onUpdate={handleRefresh} />
          </div>
        </div>
      )}

      {/* Professors Section */}
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="mb-8 flex w-full items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h2 className="mb-1 text-3xl font-bold">Professors</h2>
            <p className="text-gray-600">Our Assistant Professor</p>
          </div>
          {isAdmin && (
            <button
              onClick={handleAddProfessor}
              className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-green-500 active:scale-95">
              <i className="fa-solid fa-plus mr-2"></i>
              Add Professor
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {professorsData.map(professor => (
            <FacultyCard
              key={professor.id}
              profile={professor}
              onUpdate={handleRefresh}
            />
          ))}
        </div>
      </div>
      {openAddModal && isAdmin && (
        <AddFacultyModal
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
          onSuccess={handleRefresh}
          facultyType={addType}
        />
      )}
    </div>
  );
}

export const RestProfile = () => {
  const {faculty: nonTeachingData, loading, refetch} = useNonTeachingStaff();

  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const handleAddStaff = () => {
    setTimeout(() => {
      setOpenAddModal(true);
    }, 200);
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-2">Loading staff data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="mb-8 flex w-full items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h2 className="mb-1 text-3xl font-bold">Non-Teaching Staffs</h2>
            <p className="text-gray-600">Our Staff</p>
          </div>
          {isAdmin && (
            <button
              onClick={handleAddStaff}
              className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-green-500 active:scale-95">
              <i className="fa-solid fa-plus mr-2"></i>
              Add Staff
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {nonTeachingData.map(staff => (
            <FacultyCard key={staff.id} profile={staff} onUpdate={refetch} />
          ))}
        </div>
      </div>
      {openAddModal && isAdmin && (
        <AddFacultyModal
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
          onSuccess={refetch}
          facultyType="non-teaching"
        />
      )}
    </div>
  );
};

export const GuestFacultyProfile = () => {
  const {faculty: guestData, loading, refetch} = useGuestFaculty();

  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const handleAddGuest = () => {
    setTimeout(() => {
      setOpenAddModal(true);
    }, 200);
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-2">Loading guest faculty data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="mb-8 flex w-full items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h2 className="mb-1 text-3xl font-bold">Guest Faculty</h2>
            <p className="text-gray-600">Our Guest Faculty</p>
          </div>
          {isAdmin && (
            <button
              onClick={handleAddGuest}
              className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-green-500 active:scale-95">
              <i className="fa-solid fa-plus mr-2"></i>
              Add Guest Faculty
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {guestData.map(guest => (
            <FacultyCard key={guest.id} profile={guest} onUpdate={refetch} />
          ))}
        </div>
      </div>
      {openAddModal && isAdmin && (
        <AddFacultyModal
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
          onSuccess={refetch}
          facultyType="guest"
        />
      )}
    </div>
  );
};
