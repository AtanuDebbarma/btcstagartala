import {
  handleAdminLoginSubmit,
  handleAdminGoogleLogin,
  handleAdminForgotPassword,
  handleChange,
} from '@/helpers/adminLoginHelpers/adminLoginHelpers';
import {useNavigate} from 'react-router-dom';
import {ClipLoader} from '@/components/Spinner';
import type {Dispatch, MouseEvent, SetStateAction} from 'react';
import {useState} from 'react';

interface AdminFormInputsProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}
export const AdminFormInputs = ({
  loading,
  setLoading,
  setSuccess,
}: AdminFormInputsProps) => {
  const [formData, setFormData] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<{error: string; password?: boolean}>({
    error: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //Admin Email
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const navigate = useNavigate();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    void handleAdminLoginSubmit(
      e,
      allowedAdminEmails,
      setError,
      formData,
      setLoading,
      setSuccess,
      navigate,
    );
  };

  const handleGoogleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    void handleAdminGoogleLogin(
      e,
      allowedAdminEmails,
      setError,
      setLoading,
      setSuccess,
      navigate,
    );
  };
  const handleForgotPassword = async (e: MouseEvent<HTMLButtonElement>) => {
    void handleAdminForgotPassword(
      e,
      allowedAdminEmails,
      formData,
      setError,
      setLoading,
    );
  };

  return (
    <div className="mt-25 w-[80%] max-w-md rounded-lg bg-gray-300 p-8 shadow-2xl">
      <h2 className="mb-8 text-center text-4xl font-bold text-black">
        ADMIN LOG IN
      </h2>

      <div>
        <div className="mb-6">
          {error.error && !error.password && (
            <p className="text-md mb-2 text-red-500">{error.error}</p>
          )}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={e => handleChange(e, setFormData, setError)}
            placeholder="Email"
            className={`w-full rounded bg-white p-4 text-black focus:ring-2 ${error.error ? 'border-red-500' : 'focus:ring-[#900090]'} focus:outline-none`}
          />
        </div>

        <div className="relative mb-6">
          {error.error && error.password && (
            <p className="text-md mb-2 text-red-500">{error.error}</p>
          )}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={e => handleChange(e, setFormData, setError)}
            placeholder="Password"
            className={`w-full rounded bg-white p-4 pr-12 text-black focus:ring-2 ${
              error.password ? 'border-red-500' : 'focus:ring-[#900090]'
            } focus:outline-none`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility">
            <i
              className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer text-center text-sm font-medium`}></i>
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleForgotPassword}
            type="button"
            className="cursor-pointer text-gray-600 hover:text-purple-800">
            Forgot Password
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="cursor-pointer text-[#0a2540] hover:text-purple-800">
            <i className="fa-brands fa-google"></i>
            <span>{''} Google Login</span>
          </button>
        </div>
        <button
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className="w-full cursor-pointer rounded bg-[#3f003f] p-4 font-medium text-white transition-colors duration-200 hover:bg-[#3f003f]/80">
          {loading ? (
            <ClipLoader size={20} color="#1a3bdf" loading={loading} />
          ) : (
            'Login'
          )}
        </button>
      </div>
    </div>
  );
};
