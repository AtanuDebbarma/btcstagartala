import CollegeResources from '@/components/home/collegeResources';
import {CustomCarouselMain} from '@/components/home/carousel/customCarouselMain';
import NewsTicker from '@/components/home/newsTicker';
import {NoticeSection} from '@/components/home/noticeSection/noticeSection';
import {SmallAboutCard} from '@/components/home/smallAboutCard';
import {StatsBanner} from '@/components/home/statsBanner';
import {QuickAccess} from '@/components/home/quickAccess';

const Home = () => {
  return (
    <div className="flex w-full flex-col">
      <CustomCarouselMain />
      <NewsTicker />
      <QuickAccess />
      <NoticeSection />
      <SmallAboutCard />
      <StatsBanner />
      <CollegeResources />
    </div>
  );
};

export default Home;
