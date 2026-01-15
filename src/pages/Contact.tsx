import React, {useState} from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

export default function Contact(): React.JSX.Element {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Construct mailto link with form data
    const recipient = 'btcst15@gmail.com';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );

    // Open user's default email client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Optional: Reset form after opening email client
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 500);
  };

  return (
    <>
      <SEO {...pageSEO.contact} />
      <div className="min-h-screen bg-linear-to-br from-[#3f003f] via-[#630063] to-[#900090] px-4 pt-20 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Section - Contact Info */}
            <div className="space-y-6 text-white lg:space-y-8">
              <h1 className="mb-4 font-serif text-4xl sm:mb-6 sm:text-5xl md:text-6xl">
                Contact Us
              </h1>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg">
                  Bhavan's Tripura College of Science & Technology
                </p>
                <p className="text-base sm:text-lg">
                  Affiliated to Tripura University
                </p>
                <p className="text-base sm:text-lg">( A Central University)</p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-base font-semibold sm:text-lg">
                      Address
                    </p>
                    <p className="mt-1 text-xl font-semibold sm:text-2xl">
                      Anandanagar, Agartala- 799 004
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-base font-semibold sm:text-lg">Phone</p>
                    <p className="wrap-break-words mt-1 text-lg font-semibold sm:text-xl">
                      Phone- (0381)2861210; Mo- 9436127328 / 9436468794
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-base font-semibold sm:text-lg">Email</p>
                    <p className="wrap-break-words mt-1 text-lg font-semibold sm:text-xl">
                      E-mail: btcst15@gmail.com; Website :btcstagartala.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm sm:p-8">
                <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">
                  Send Us a Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none sm:py-4"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none sm:py-4"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none sm:py-4"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full resize-none rounded bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none sm:py-4"
                      required></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="rounded bg-white px-8 py-3 text-base font-semibold text-[#900090] transition-colors duration-200 hover:bg-gray-100 sm:px-10 sm:py-4 sm:text-lg">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
