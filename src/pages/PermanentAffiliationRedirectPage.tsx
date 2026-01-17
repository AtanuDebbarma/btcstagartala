import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {appStore} from '@/appStore/appStore';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

const PermanentAffiliationRedirectPage = () => {
  const navigate = useNavigate();
  const permanentAffiliation = appStore(state => state.permanentAffiliation);

  useEffect(() => {
    // Wait a moment for the store to be populated, then redirect
    const timer = setTimeout(() => {
      if (permanentAffiliation?.url) {
        // Use dynamic URL from Firebase
        void navigate(
          `/pdf-viewer?file=${encodeURIComponent(permanentAffiliation.url)}`,
          {
            replace: true,
          },
        );
      } else {
        // Fallback to hardcoded URL if no Firebase document found
        const fallbackUrl =
          'https://old.btcstagartala.org/wp-content/uploads/2024/05/PermanentAffiliation.pdf';
        void navigate(`/pdf-viewer?file=${encodeURIComponent(fallbackUrl)}`, {
          replace: true,
        });
      }
    }, 500); // Small delay to allow store to populate

    return () => clearTimeout(timer);
  }, [navigate, permanentAffiliation]);

  return (
    <>
      <SEO {...pageSEO.permanentAffiliation} />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="text-gray-600">
            Loading Permanent Affiliation Document...
          </p>
        </div>
      </div>
    </>
  );
};

export default PermanentAffiliationRedirectPage;
