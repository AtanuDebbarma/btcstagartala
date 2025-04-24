import {Assets} from '../../assets/assetData';

export const LogoSection = () => (
  <div className="border-b bg-white px-6 py-3">
    <div className="flex flex-col items-center justify-evenly md:flex-row">
      {/* Logo and College Info */}
      <div className="flex items-center">
        <img
          src={Assets.link.logo}
          alt="College Logo"
          className="mr-3 w-16 md:w-20"
        />
        <div>
          <h1 className="text-lg font-bold text-blue-600 md:text-2xl">
            Bhavan’s Tripura College of Science & Technology
          </h1>
          <p className="text-sm">Recognized by AICTE and UGC</p>
          <p className="text-sm">Affiliated with Tripura University</p>
          <p className="text-sm">
            Accredited by NAAC with{' '}
            <span className="font-bold text-red-500">'B++' Grade</span>
          </p>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="mt-2 flex flex-col items-center gap-0 sm:mt-4 sm:gap-8 md:mt-0 md:flex-row md:justify-end">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div>
            <p className="font-medium">(0381)2861210</p>
            <p className="text-sm">Phone number</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="mt-4 font-medium sm:mt-10 xl:mt-4">FOLLOW US ON:</p>
          <div className="mt-1 flex space-x-2">
            <a
              href="https://www.facebook.com/people/BTCST/100068331848822/?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-square items-center justify-center rounded-full bg-blue-600 p-2 text-white transition-transform duration-150 ease-in-out hover:bg-blue-800 active:scale-90">
              <i className="fa-brands fa-facebook text-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/btcst.agartala.official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-square items-center justify-center rounded-full bg-blue-400 p-2 text-white transition-transform duration-150 ease-in-out hover:bg-blue-600 active:scale-90">
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 w-25 md:mt-0">
          <img
            src={Assets.link.topEmblem}
            alt="College Emblem"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);
