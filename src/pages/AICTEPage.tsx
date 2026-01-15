import {DocumentTableMain} from '@/components/documentTable/documentTableMain';
import {Assets} from '@/assets/assetData';
import {SEO} from '@/components/SEO/SEO';
import {useFetchAICTEDocuments} from '@/services/aicte/fetchAICTEDocuments';

const AICTEPage = () => {
  useFetchAICTEDocuments();

  return (
    <>
      <SEO
        title="AICTE Recognition | BTCST Agartala"
        description="Bhavan's Tripura College of Science & Technology is recognized by AICTE. View all AICTE related documents and approvals."
        keywords="AICTE, AICTE recognition, BTCST AICTE, college approval, technical education"
      />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              AICTE Recognition
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
            <p className="mt-2 text-sm font-semibold text-nowrap text-gray-100 drop-shadow-lg sm:text-base md:text-lg">
              Recognized by AICTE
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="AICTE Recognition"
          />
        </div>

        <DocumentTableMain collectionType="aicte" pageTitle="AICTE Document" />
      </div>
    </>
  );
};

export default AICTEPage;
