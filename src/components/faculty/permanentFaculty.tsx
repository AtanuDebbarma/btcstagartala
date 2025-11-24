import {
  FacultyProfile,
  GuestFacultyProfile,
  RestProfile,
} from './facultyCardUI';

export const PermanentFaculty = () => {
  return (
    <div className="mt-12">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Our Permanent Faculty
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-10 py-5 xl:px-0">
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="w-full px-10 py-10 text-justify">
            <FacultyProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export const NonTeacthingStaff = () => {
  return (
    <div className="mt-12">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Our Non Teaching Staffs
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-10 py-5 xl:px-0">
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="w-full px-10 py-10 text-justify">
            <RestProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export const GuestFaculty = () => {
  return (
    <div className="mt-12">
      <div className="flex w-full items-center justify-center">
        <h2 className="relative mb-6 inline-block text-2xl font-bold tracking-wide">
          Our Guest Faculty
          <span className="absolute right-0 -bottom-1 h-1 w-1/2 rounded bg-yellow-400"></span>
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-10 py-5 xl:px-0">
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-lg">
          <div className="w-full px-10 py-10 text-justify">
            <GuestFacultyProfile />
          </div>
        </div>
      </div>
    </div>
  );
};
