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
                      Anandanagar, Agartala- 799004
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
                      Phone-{' '}
                      <a
                        href="tel:+913812861210"
                        className="text-cyan-300 transition-colors hover:text-blue-300">
                        (0381)2861210
                      </a>
                      ; Mo-{' '}
                      <a
                        href="tel:+919436127328"
                        className="text-cyan-300 transition-colors hover:text-blue-300">
                        9436127328
                      </a>{' '}
                      /{' '}
                      <a
                        href="tel:+919436468794"
                        className="text-cyan-300 transition-colors hover:text-blue-300">
                        9436468794
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <div>
                    <p className="text-base font-semibold sm:text-lg">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/919863109286"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wrap-break-words mt-1 block text-lg font-semibold text-cyan-300 transition-colors hover:text-blue-300 sm:text-xl">
                      +91 9863109286
                    </a>
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
                      E-mail:{' '}
                      <a
                        href="mailto:btcst15@gmail.com"
                        className="text-cyan-300 transition-colors hover:text-blue-300">
                        btcst15@gmail.com
                      </a>
                      ; Website: btcstagartala.org
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
                      className="cursor-pointer rounded bg-white px-8 py-3 text-base font-semibold text-[#900090] transition-colors duration-200 hover:bg-gray-100 sm:px-10 sm:py-4 sm:text-lg">
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
