import {Assets} from '../../assets/assetData';

export const LogoSection = () => (
  <div className="bg-white py-3 px-6 border-b">
    <div className="flex flex-col md:flex-row justify-evenly items-center">
      {/* Logo and College Info */}
      <div className="flex items-center">
        <img
          src={Assets.link.logo}
          alt="College Logo"
          className="w-16 md:w-20 mr-3"
        />
        <div>
          <h1 className="text-blue-600 text-lg md:text-2xl font-bold">
            Bhavan’s Tripura College of Science & Technology
          </h1>
          <p className="text-sm">Recognized by NCTE and UGC</p>
          <p className="text-sm">Affiliated with Tripura University & SCERT</p>
          <p className="text-sm">
            Accredited by NAAC with{' '}
            <span className="text-red-500 font-bold">'B++' Grade</span>
          </p>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center md:justify-end gap-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500 mr-2"
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
          <p className="font-medium xl:mt-4 mt-10">FOLLOW US ON:</p>
          <div className="flex space-x-2 mt-1 ">
            <a
              href="https://www.facebook.com/people/BTCST/100068331848822/?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-2 rounded-full flex items-center justify-center aspect-square">
              <i className="fa-brands fa-facebook text-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/btcst.agartala.official"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-2 rounded-full flex items-center justify-center aspect-square">
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0 w-25">
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
