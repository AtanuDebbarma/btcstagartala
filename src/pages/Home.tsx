import CollegeResources from '@/components/home/collegeResources';
import {CustomCarouselMain} from '@/components/home/carousel/customCarouselMain';
import NewsTicker from '@/components/home/newsTicker';
import {NoticeSection} from '@/components/home/noticeSection/noticeSection';
import {SmallAboutCard} from '@/components/home/smallAboutCard';
import {StatsBanner} from '@/components/home/statsBanner';
import {QuickAccess} from '@/components/home/quickAccess';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

const Home = () => {
  return (
    <>
      <SEO {...pageSEO.home} />
      <main className="flex w-full flex-col">
        <section aria-label="Image Carousel">
          <h2 className="sr-only">Featured Images</h2>
          <CustomCarouselMain />
        </section>

        <section aria-label="News Ticker">
          <h2 className="sr-only">Latest News</h2>
          <NewsTicker />
        </section>

        <section aria-label="Quick Access">
          <h2 className="sr-only">Quick Access Links</h2>
          <QuickAccess />
        </section>

        <section aria-label="Notice Board">
          <NoticeSection />
        </section>

        <section aria-label="About College">
          <SmallAboutCard />
        </section>

        <section aria-label="College Statistics">
          <StatsBanner />
        </section>

        <section aria-label="College Resources">
          <CollegeResources />
        </section>
      </main>
    </>
  );
};

export default Home;
