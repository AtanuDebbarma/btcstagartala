import {DocumentTableMain} from '@/components/documentTable/documentTableMain';
import {Assets} from '@/assets/assetData';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {useFetchAISHEDocuments} from '@/services/aishe/fetchAISHEDocuments';

const AISHEPage = () => {
  useFetchAISHEDocuments();

  return (
    <>
      <SEO {...pageSEO.aishe} />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              AISHE Documents
            </h1>
            <p className="mt-2 text-sm font-semibold text-nowrap text-gray-100 drop-shadow-lg sm:text-base md:text-lg">
              (All India Survey on Higher Education)
            </p>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="AISHE Documents"
            loading="lazy"
          />
        </div>

        <DocumentTableMain
          collectionType="aishe"
          pageTitle="Documents related to All India Survey on Higher Education (AISHE)"
        />
      </div>
    </>
  );
};

export default AISHEPage;
