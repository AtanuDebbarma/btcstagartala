import {stats} from '@/data/homeData/statsbannerData';
import {StatsBannerTypes} from '@/types/homeTypes';
import {parseCount} from '@/utils/Home/statsBannerUtils';
import CountUp from 'react-countup';

export const StatsBanner = () => {
  return (
    <div className="w-full bg-blue-600 py-6 px-4 mt-20">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {stats.map((stat: StatsBannerTypes, index) => {
          const {number, suffix} = parseCount(stat.count);

          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <i className={`${stat.iconClass} text-4xl text-amber-50`} />
              </div>
              <div className="text-amber-50">
                <div className="text-3xl font-bold">
                  <CountUp
                    end={number}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {suffix}
                </div>
                <div className="text-sm">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
