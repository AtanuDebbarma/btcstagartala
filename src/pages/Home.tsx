import {CustomCarousel} from '@/components/home/customCarousel';
import NewsTicker from '@/components/home/newsTicker';
import {NoticeSection} from '@/components/home/noticeSection/noticeSection';
import {SmallAboutCard} from '@/components/home/smallAboutCard';
import {StatsBanner} from '@/components/home/statsBanner';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <CustomCarousel />
      <NewsTicker />
      <NoticeSection />
      <SmallAboutCard />
      <StatsBanner />
      <div className="h-50"></div>
    </div>
  );
};

export default Home;
