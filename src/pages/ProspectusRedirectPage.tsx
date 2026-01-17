import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {appStore} from '@/appStore/appStore';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

const ProspectusRedirectPage = () => {
  const navigate = useNavigate();
  const prospectusAndAdmission = appStore(
    state => state.prospectusAndAdmission,
  );

  useEffect(() => {
    // Wait a moment for the store to be populated, then redirect
    const timer = setTimeout(() => {
      if (prospectusAndAdmission.length > 0) {
        // Use the first document's URL (there should only be one prospectus)
        const prospectusUrl = prospectusAndAdmission[0].url;
        // Add a state to indicate this came from prospectus redirect
        void navigate(`/pdf-viewer?file=${encodeURIComponent(prospectusUrl)}`, {
          replace: true,
          state: {from: 'prospectus-redirect'},
        });
      } else {
        // If no data in store yet, redirect to home page
        void navigate('/', {replace: true});
      }
    }, 500); // Small delay to allow store to populate

    return () => clearTimeout(timer);
  }, [navigate, prospectusAndAdmission]);

  return (
    <>
      <SEO {...pageSEO.prospectus} />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="text-gray-600">Loading Prospectus...</p>
        </div>
      </div>
    </>
  );
};

export default ProspectusRedirectPage;
