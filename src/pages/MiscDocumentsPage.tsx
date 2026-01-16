import {DocumentTableMain} from '@/components/documentTable/documentTableMain';
import {Assets} from '@/assets/assetData';
import {SEO} from '@/components/SEO/SEO';
import {useFetchMiscDocuments} from '@/services/miscDocuments/fetchMiscDocuments';

const MiscDocumentsPage = () => {
  useFetchMiscDocuments();

  return (
    <>
      <SEO
        title="Miscellaneous Documents | BTCST Agartala"
        description="Access miscellaneous documents and important files from Bhavan's Tripura College of Science & Technology."
        keywords="BTCST documents, college documents, miscellaneous files, important documents"
      />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Miscellaneous Documents
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
            <p className="mt-2 text-sm font-semibold text-nowrap text-gray-100 drop-shadow-lg sm:text-base md:text-lg">
              Important Documents & Files
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Miscellaneous Documents"
            loading="lazy"
          />
        </div>

        <DocumentTableMain
          collectionType="misc-documents"
          pageTitle="Miscellaneous Document"
        />
      </div>
    </>
  );
};

export default MiscDocumentsPage;
