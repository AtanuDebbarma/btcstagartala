import {stats} from '@/data/homeData/statsbannerData';
import {StatsBannerTypes} from '@/types/homeTypes';
import {parseCount} from '@/utils/Home/statsBannerUtils';
import CountUp from 'react-countup';

export const StatsBanner = () => {
  return (
    <article className="mt-20 w-full bg-[#900090] px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        {stats.map((stat: StatsBannerTypes, index) => {
          const {number, suffix} = parseCount(stat.count);

          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="shrink-0">
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
    </article>
  );
};
