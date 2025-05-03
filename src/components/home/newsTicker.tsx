import {appStore} from '@/appStore/appStore';
import {RouteNames} from '@/constants/routeNames';
import useWindowSize from '@/helpers/findWindowSize';
import {AlertsType} from '@/types/homeTypes';

import {useRef, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function NewsTicker() {
  const alerts = appStore(state => state.alerts);
  const tickerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(10);

  // Safety check to ensure alerts is always an array
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  const sortedAlerts = [...safeAlerts].sort((a: AlertsType, b: AlertsType) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.toMillis() - a.createdAt.toMillis();
  });

  const {width} = useWindowSize();

  // Function to adjust animation speed based on screen width
  useEffect(() => {
    const adjustSpeed = () => {
      // Faster animation for smaller screens
      if (width < 766) {
        setAnimationDuration(6);
      } else if (width < 1024) {
        setAnimationDuration(8);
      } else {
        setAnimationDuration(12);
      }
    };

    // Set initial speed
    adjustSpeed();

    // Update speed on resize
    window.addEventListener('resize', adjustSpeed);
    return () => window.removeEventListener('resize', adjustSpeed);
  }, [width]);

  const navigation = useNavigate();
  const handleNavigation = (url: string) => {
    setTimeout(() => {
      navigation(url);
      scrollTo(0, 0);
    }, 200);
  };

  return (
    <div className="flex w-full items-center overflow-hidden bg-gray-300">
      <button
        onClick={() => handleNavigation(RouteNames.ALERTS)}
        className="cursor-pointer bg-yellow-500 px-4 py-2 font-bold whitespace-nowrap text-black duration-200 ease-in-out active:scale-95 sm:px-8">
        Alerts:
      </button>
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <div
          ref={tickerRef}
          className="whitespace-nowrap"
          style={{
            width: '200%',
            display: 'flex',
            animation: `ticker ${animationDuration}s linear infinite`,
          }}>
          {/* First copy of the news items */}
          <div className="flex-1 whitespace-nowrap">
            {sortedAlerts.length > 0 ? (
              sortedAlerts.map((item, index) => (
                <span
                  key={`first-${index}`}
                  className="inline-flex items-center gap-1 px-4 text-sm text-gray-900 md:text-base">
                  <span
                    className="rounded-sm px-1 font-bold text-red-600"
                    style={{animation: 'blink 1s ease-in-out infinite'}}>
                    NEW
                  </span>
                  <button
                    onClick={() =>
                      handleNavigation(
                        `${RouteNames.ALERTS}/${item.id}/${item.title}`,
                      )
                    }
                    className="cursor-pointer pl-1 hover:text-blue-600 hover:underline">
                    {item.title}
                  </button>
                  {index < sortedAlerts.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-1 px-4 text-sm text-gray-900 md:text-base">
                <span
                  className="rounded-sm px-1 font-bold text-red-600"
                  style={{animation: 'blink 1s ease-in-out infinite'}}>
                  NO NEW ALERTS
                </span>
              </span>
            )}
          </div>

          {/* Second copy of the news items */}
          <div className="flex-1 whitespace-nowrap">
            {sortedAlerts.length > 0 ? (
              sortedAlerts.map((item, index) => (
                <span
                  key={`second-${index}`}
                  className="inline-flex items-center gap-1 px-4 text-sm text-gray-900 md:text-base">
                  <span
                    className="rounded-sm px-1 font-bold text-red-600"
                    style={{animation: 'blink 1s ease-in-out infinite'}}>
                    NEW
                  </span>
                  <button
                    onClick={() =>
                      handleNavigation(
                        `${RouteNames.ALERTS}/${item.id}/${item.title}`,
                      )
                    }
                    className="cursor-pointer pl-1 hover:text-blue-600 hover:underline">
                    {item.title}
                  </button>
                  {index < sortedAlerts.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-1 px-4 text-sm text-gray-900 md:text-base">
                <span
                  className="rounded-sm px-1 font-bold text-red-600"
                  style={{animation: 'blink 1s ease-in-out infinite'}}>
                  NO NEW ALERTS
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
