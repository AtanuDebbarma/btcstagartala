import {ClipLoader} from 'react-spinners';

export const LoadingModal = ({
  loading,
  success,
}: {
  loading: boolean;
  success: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex h-90 w-[50%] translate-x-0 transform items-center justify-center bg-gray-300 p-5 text-white transition-transform duration-300 ease-in-out">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">
              LOGGING IN
            </h2>
            <ClipLoader
              className="mt-5"
              size={30}
              color="#1a3bdf"
              loading={loading}
            />
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">
              LOGGIN SUCESS
            </h2>
            <p className="mt-5 text-4xl">✅</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
