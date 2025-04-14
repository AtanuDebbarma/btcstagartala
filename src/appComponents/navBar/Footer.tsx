import {Assets} from '@/assets/assetData';

function Footer() {
  return (
    <footer className="mt-25 bg-[#010e1f] py-8 text-white">
      <div className="container mx-auto mt-3 max-w-7xl px-10 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column - College Info */}
          <div className="space-y-4">
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

            <div className="mt-4">
              <div className="mb-2">
                <p className="text-gray-400">Phone number</p>
                <p className="text-cyan-300 hover:text-blue-300">
                  (0381)2861210; 9436127328; 9436468794
                </p>
              </div>

              <div className="mb-2">
                <p>Anandanagar, Agartala</p>
                <p>West Tripura, Pin - 799004</p>
              </div>

              <div>
                <a
                  href="mailto:bhavanbedc_trip@rediffmail.com"
                  className="text-cyan-300 hover:text-blue-300">
                  btcst15@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column - Useful Links */}
          <div className="flex flex-col items-center text-justify">
            <div className="space-y-2">
              <h3 className="mb-4 text-lg font-semibold">Useful Links</h3>
              <a
                href="#home"
                className="block text-gray-300 hover:text-blue-300">
                Home
              </a>
              <a
                href="#contact"
                className="block text-gray-300 hover:text-blue-300">
                Contact Us
              </a>
              <a
                href="#admissionForm"
                className="block text-gray-300 hover:text-blue-300">
                Admission Form
              </a>
              <a
                href="#notice"
                className="block text-gray-300 hover:text-blue-300">
                Notice Board
              </a>
              <a
                href="#gallery"
                className="block text-gray-300 hover:text-blue-300">
                Gallery
              </a>
              <a
                href="#academics"
                className="block text-gray-300 hover:text-blue-300">
                Academics
              </a>
              <a
                href="#about"
                className="block text-gray-300 hover:text-blue-300">
                About Us
              </a>
            </div>
          </div>

          {/* Right Column - Maps */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Location</h3>
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
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/people/BTCST/100068331848822/?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400">
            <i className="fa-brands fa-facebook h-6 w-6 text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/btcst.agartala.official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400">
            <i className="fa-brands fa-instagram h-6 w-6 text-lg"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-6 text-sm text-gray-400 md:flex-row">
          <div>
            <p>© 2025 Bhavan’s Tripura College of Science & Technology</p>
            <p>All Rights Reserved.</p>
          </div>
          <div className="mt-4 text-right md:mt-0">
            <p>
              Created by{' '}
              <a
                href="https://www.linkedin.com/in/atanu-debbarma/"
                className="text-blue-400 hover:text-blue-300">
                Atanu Debbarma
              </a>
            </p>

            <a
              href="https://github.com/AtanuDebbarma"
              className="text-blue-400 hover:text-blue-300">
              Github
            </a>
            <span className="text-blue-400 hover:text-blue-300">
              {''} | {''}
            </span>
            <a
              href="https://www.facebook.com/ADRDevil/"
              className="text-blue-400 hover:text-blue-300">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
