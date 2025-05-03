import design from '@/assets/noticeBoardBanner.png';
import {AlertsTableMain} from '@/components/alertsComponents/alertsTableMain';

const AlertsPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-50 w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-md xxxxs:text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-5xl">
            News Alerts
          </h1>
          <p className="xxxxs:text-md mt-7 text-sm font-bold text-nowrap text-gray-200 drop-shadow-lg sm:text-2xl">
            Bhavan’s Tripura College of Science & Technology
          </p>
        </div>
        <img
          className="h-full w-full object-cover"
          src={design}
          alt="notice-image"
        />
      </div>

      <AlertsTableMain />
    </div>
  );
};

export default AlertsPage;
