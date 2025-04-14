import {useState} from 'react';
import {LoadingModal} from '@/components/adminLogin/loadingModal';
import {AdminFormInputs} from '@/components/adminLogin/adminFormInputs';

export const AdminLoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen items-start justify-center">
      <AdminFormInputs
        loading={loading}
        setLoading={setLoading}
        setSuccess={setSuccess}
      />
      {(loading || success) && (
        <LoadingModal loading={loading} success={success} />
      )}
    </div>
  );
};

export default AdminLoginForm;
