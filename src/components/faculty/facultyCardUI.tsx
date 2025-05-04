import {
  FacultyCardDataType,
  nonTeacthingStaff,
  principal,
  professors,
} from '@/helpers/facultyHelpers/facultyProfileData';

export const FacultyCard = ({profile}: {profile: FacultyCardDataType}) => {
  return (
    <div
      className={`w-full max-w-[250px] overflow-hidden rounded-md bg-white shadow-md`}>
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
        <div className="mt-3 text-center break-words">
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
            <strong>Contact:</strong>
            {profile.details.contact}
          </p>
          {profile.details.email && (
            <p className="text-left text-sm text-gray-600">
              <strong>Email:</strong> {profile.details.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export function FacultyProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Principal Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-1 text-3xl font-bold">Principal</h1>
        <p className="mb-8 text-gray-600">Principal</p>

        <div className="mx-auto flex max-w-md flex-col items-center justify-center">
          <FacultyCard profile={principal} />
        </div>
      </div>

      {/* Professors Section */}
      <div className="mb-12 flex flex-col items-center justify-center">
        <h2 className="mb-1 text-center text-3xl font-bold">Professors</h2>
        <p className="mb-8 text-center text-gray-600">
          Our Assistant Professor
        </p>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {professors.map((professor, index) => (
            <FacultyCard key={index} profile={professor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const RestProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Professors Section */}
      <div className="mb-12 flex flex-col items-center justify-center">
        <h2 className="mb-1 text-center text-3xl font-bold">
          Non-Teaching Staffs
        </h2>
        <p className="mb-8 text-center text-gray-600">Our Staff</p>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {nonTeacthingStaff.map((nonT, index) => (
            <FacultyCard key={index} profile={nonT} />
          ))}
        </div>
      </div>
    </div>
  );
};
