import {appStore} from '@/appStore/appStore';
import {Assets} from '@/assets/assetData';
import {RouteNames} from '@/constants/routeNames';
import {useLocation, useNavigate} from 'react-router-dom';

function Footer() {
  const nanvigation = useNavigate();

  const location = useLocation(); // Get current location

  // Access current route
  const currentPath = location.pathname; // e.g., "/home", "/contact", etc.

  const handleNav = (url: string) => {
    setTimeout(() => {
      nanvigation(url);
      scrollTo(0, 0);
    }, 200);
  };
  const {prospectusAndAdmission} = appStore.getState();
  const admissionFormUrl = prospectusAndAdmission.find(
    item => item.name === 'Admission_Form',
  )?.url;

  const usefulLinks = [
    {label: 'Home', path: RouteNames.HOME},
    {label: 'Contact Us', path: RouteNames.CONTACT},
    {label: 'Admission Form', path: `/pdf-viewer?file=${admissionFormUrl}`},
    {label: 'Notice Board', path: RouteNames.NOTICE_BOARD},
    {label: 'Gallery', path: '/gallery'},
    {label: 'Academics', path: RouteNames.ACADEMICS},
    {label: 'About Us', path: RouteNames.ABOUT},
    {label: 'Alerts', path: RouteNames.ALERTS},
  ];
  const mT = currentPath === '/contact' ? 'mt-0' : 'mt-25';
  return (
    <footer className={`${mT} bg-[#360036] py-8 text-white`} role="contentinfo">
      <div className="container mx-auto mt-3 max-w-7xl px-10 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column - College Info */}
          <section aria-label="College Information" className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={Assets.link.logo}
                alt="College Logo"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">
                  Bhavan’s Tripura College of Science & Technology
                </h2>
                <p className="text-sm text-gray-300">
                  Affiliated to Tripura University (A Central University)
                </p>
                <p className="text-sm text-gray-300">
                  Agartala, Tripura West, North East, India
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center text-justify sm:items-start sm:justify-start">
              <div className="mb-2">
                <p className="text-gray-400">Phone number</p>
                <span className="flex flex-col gap-1 sm:flex-row">
                  <p className="text-cyan-300 hover:text-blue-300">
                    (0381)2861210;
                  </p>
                  <p className="text-cyan-300 hover:text-blue-300">
                    9436127328;
                  </p>
                  <p className="text-cyan-300 hover:text-blue-300">
                    9436468794
                  </p>
                </span>
              </div>

              <div className="mb-2">
                <span className="flex flex-col gap-1 sm:flex-row">
                  <p>Anandanagar</p>
                  <p>Agartala,</p>
                  <p>West Tripura,</p>
                  <p>Pin - 799004</p>
                </span>
              </div>

              <div>
                <a
                  href="mailto:bhavanbedc_trip@rediffmail.com"
                  className="text-cyan-300 hover:text-blue-300">
                  btcst15@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Middle Column - Useful Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-center justify-center text-justify">
            <div className="space-y-2">
              <h2 className="mb-4 text-lg font-semibold">Useful Links</h2>
              {usefulLinks.map((link, index) => (
                <div
                  key={index}
                  onClick={() => handleNav(link.path)}
                  className="transform-transform block cursor-pointer text-gray-300 duration-180 ease-in-out hover:text-blue-300 active:scale-95">
                  {link.label}
                </div>
              ))}
            </div>
          </nav>

          {/* Right Column - Maps */}
          <section aria-label="Location">
            <h2 className="mb-4 text-lg font-semibold">Our Location</h2>
            <div className="flex h-64 w-full items-center justify-center bg-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.9271970287227!2d91.31926999999999!3d23.7856067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f319bf5b0da3%3A0x771fc5c00637e6ca!2sBhavan&#39;s%20Tripura%20College%20of%20Science%20%26%20Technology!5e0!3m2!1sen!2sin!4v1744280684386!5m2!1sen!2sin"
                width={'100%'}
                height={'256px'}
                style={{border: 0, borderRadius: '6px'}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </section>
        </div>

        {/* Social Media Links */}
        <nav
          aria-label="Social media links"
          className="mt-8 flex items-center justify-center space-x-6 text-justify">
          <a
            href="https://www.facebook.com/people/BTCST/100068331848822/?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            className="text-gray-300 hover:text-blue-400">
            <i
              className="fa-brands fa-facebook h-6 w-6 text-lg"
              aria-hidden="true"></i>
          </a>
          <a
            href="https://www.instagram.com/btcst.agartala.official"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
            className="text-gray-300 hover:text-blue-400">
            <i
              className="fa-brands fa-instagram h-6 w-6 text-lg"
              aria-hidden="true"></i>
          </a>
        </nav>

        {/* Copyright Section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-6 text-sm text-gray-400 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:items-start sm:justify-start sm:text-start">
            <p>© 2025 Bhavan’s Tripura College of Science & Technology</p>
            <p>All Rights Reserved.</p>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center md:mt-0">
            <a
              href="https://github.com/AtanuDebbarma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Created by - Visit GitHub profile"
              className="text-xl text-white hover:text-blue-600">
              <i className="fa-brands fa-github" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
