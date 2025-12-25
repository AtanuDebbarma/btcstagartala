import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const defaultSEO: SEOData = {
  title: "BTCST Agartala | Bhavan's Tripura College of Science & Technology",
  description:
    "Official website of Bhavan's Tripura College of Science & Technology (BTCST), affiliated to Tripura University. Offering quality education in Science & Technology in Agartala, Tripura.",
  keywords:
    "BTCST, Bhavan's Tripura College, Science and Technology College Tripura, Tripura University, Agartala College, Engineering College Tripura, Science College Agartala, Bharatiya Vidya Bhavan, North East India College",
  ogImage: 'https://btcstagartala.org/logo.webp',
};

const seoPages: Record<string, SEOData> = {
  '/': {
    title:
      "BTCST Agartala | Bhavan's Tripura College of Science & Technology - Home",
    description:
      "Welcome to Bhavan's Tripura College of Science & Technology (BTCST), Agartala. Affiliated to Tripura University, offering undergraduate and postgraduate programs in Science & Technology.",
    keywords:
      "BTCST home, Bhavan's Tripura College admission, Science Technology College Agartala, Tripura University affiliated college, Engineering courses Tripura, Science courses Agartala",
    canonicalUrl: 'https://btcstagartala.org/',
  },
  '/home': {
    title:
      "BTCST Agartala | Bhavan's Tripura College of Science & Technology - Home",
    description:
      "Welcome to Bhavan's Tripura College of Science & Technology (BTCST), Agartala. Affiliated to Tripura University, offering undergraduate and postgraduate programs in Science & Technology.",
    keywords:
      "BTCST home, Bhavan's Tripura College admission, Science Technology College Agartala, Tripura University affiliated college, Engineering courses Tripura, Science courses Agartala",
    canonicalUrl: 'https://btcstagartala.org/',
  },
  '/about': {
    title:
      "About BTCST | Bhavan's Tripura College of Science & Technology - History & Vision",
    description:
      "Learn about Bhavan's Tripura College of Science & Technology (BTCST), established under Bharatiya Vidya Bhavan. Our history, vision, mission, and commitment to quality education in Tripura.",
    keywords:
      "BTCST about, Bhavan's Tripura College history, Bharatiya Vidya Bhavan Tripura, college vision mission, BTCST establishment, Science Technology education Tripura",
    canonicalUrl: 'https://btcstagartala.org/about',
  },
  '/admissions': {
    title:
      'Admissions 2025 | BTCST Agartala - Apply for Science & Technology Courses',
    description:
      "Apply for admission to Bhavan's Tripura College of Science & Technology (BTCST). Undergraduate and postgraduate programs in Science, Technology, and Engineering. Online application available.",
    keywords:
      "BTCST admission 2025, Bhavan's Tripura College application, Science Technology admission Tripura, Engineering admission Agartala, college admission form, Tripura University admission",
    canonicalUrl: 'https://btcstagartala.org/admissions',
  },
  '/courses': {
    title:
      'Courses & Programs | BTCST Agartala - Science, Technology & Engineering',
    description:
      "Explore undergraduate and postgraduate courses at Bhavan's Tripura College of Science & Technology. Programs in Computer Science, Electronics, Physics, Chemistry, Mathematics, and more.",
    keywords:
      "BTCST courses, Bhavan's Tripura College programs, Science courses Tripura, Technology courses Agartala, Engineering programs, Computer Science Tripura, Electronics courses",
    canonicalUrl: 'https://btcstagartala.org/courses',
  },
  '/faculty': {
    title:
      'Faculty & Staff | BTCST Agartala - Experienced Educators & Researchers',
    description:
      "Meet the experienced faculty and staff at Bhavan's Tripura College of Science & Technology. Qualified educators and researchers committed to academic excellence.",
    keywords:
      "BTCST faculty, Bhavan's Tripura College teachers, Science faculty Tripura, Technology professors Agartala, college staff, academic team BTCST",
    canonicalUrl: 'https://btcstagartala.org/faculty',
  },
  '/gallery': {
    title: 'Photo Gallery | BTCST Agartala - Campus Life & Events',
    description:
      "Explore the photo gallery of Bhavan's Tripura College of Science & Technology. Campus infrastructure, student activities, events, and college life at BTCST Agartala.",
    keywords:
      "BTCST gallery, Bhavan's Tripura College photos, campus images Agartala, college events Tripura, student activities BTCST, infrastructure photos",
    canonicalUrl: 'https://btcstagartala.org/gallery',
  },
  '/contact': {
    title: 'Contact Us | BTCST Agartala - Address, Phone & Email',
    description:
      "Contact Bhavan's Tripura College of Science & Technology (BTCST), Agartala. Get admission information, address, phone numbers, and email. Located in Anandanagar, Agartala.",
    keywords:
      "BTCST contact, Bhavan's Tripura College address, college phone number Agartala, BTCST email, Anandanagar college, contact information Tripura",
    canonicalUrl: 'https://btcstagartala.org/contact',
  },
  '/notice-board': {
    title: 'Notice Board | BTCST Agartala - Latest Announcements & Updates',
    description:
      "Stay updated with the latest notices and announcements from Bhavan's Tripura College of Science & Technology. Important dates, exam schedules, and college updates.",
    keywords:
      "BTCST notices, Bhavan's Tripura College announcements, college updates Agartala, exam notices Tripura, important dates BTCST, student notices",
    canonicalUrl: 'https://btcstagartala.org/notice-board',
  },
};

export const useSEO = (customSEO?: Partial<SEOData>) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pageSEO = seoPages[currentPath] || defaultSEO;
    const finalSEO = {...pageSEO, ...customSEO};

    // Update document title
    document.title = finalSEO.title;

    // Update meta tags
    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);

    // Open Graph tags
    updateMetaTag('og:title', finalSEO.ogTitle || finalSEO.title, 'property');
    updateMetaTag(
      'og:description',
      finalSEO.ogDescription || finalSEO.description,
      'property',
    );
    updateMetaTag(
      'og:image',
      finalSEO.ogImage || defaultSEO.ogImage!,
      'property',
    );
    updateMetaTag(
      'og:url',
      finalSEO.canonicalUrl || `https://btcstagartala.org${currentPath}`,
      'property',
    );
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'BTCST Agartala', 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', finalSEO.ogTitle || finalSEO.title, 'name');
    updateMetaTag(
      'twitter:description',
      finalSEO.ogDescription || finalSEO.description,
      'name',
    );
    updateMetaTag(
      'twitter:image',
      finalSEO.ogImage || defaultSEO.ogImage!,
      'name',
    );

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow', 'name');
    updateMetaTag('author', 'Atanu Debbarma', 'name');
    updateMetaTag('geo.region', 'IN-TR', 'name');
    updateMetaTag('geo.placename', 'Agartala, Tripura', 'name');
    updateMetaTag('geo.position', '23.8315;91.2868', 'name');
    updateMetaTag('ICBM', '23.8315, 91.2868', 'name');

    // Canonical URL
    updateCanonicalLink(
      finalSEO.canonicalUrl || `https://btcstagartala.org${currentPath}`,
    );

    // JSON-LD Structured Data
    updateStructuredData(finalSEO, currentPath);
  }, [location.pathname, customSEO]);
};

const updateMetaTag = (
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
) => {
  let element = document.querySelector(
    `meta[${attribute}="${name}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const updateCanonicalLink = (url: string) => {
  let element = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
};

const updateStructuredData = (seo: SEOData, currentPath: string) => {
  // Remove existing structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]',
  );
  if (existingScript) {
    existingScript.remove();
  }

  let structuredData;

  if (currentPath === '/' || currentPath === '/home') {
    // Educational Organization schema for homepage
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      '@id': 'https://btcstagartala.org/#organization',
      name: "Bhavan's Tripura College of Science & Technology",
      alternateName: 'BTCST Agartala',
      url: 'https://btcstagartala.org',
      logo: 'https://btcstagartala.org/logo.webp',
      description: seo.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Anandanagar',
        addressLocality: 'Agartala',
        addressRegion: 'Tripura West',
        postalCode: '799004',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8315,
        longitude: 91.2868,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Admissions',
        email: 'contact@btcstagartala.org',
      },
      sameAs: [
        'https://www.facebook.com/BTCSTAgartala',
        'https://twitter.com/BTCSTAgartala',
      ],
      foundingDate: '2010',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Bharatiya Vidya Bhavan',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'University Affiliation',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Tripura University',
        },
      },
    };
  } else {
    // Basic WebPage schema for other pages
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: `https://btcstagartala.org${currentPath}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'BTCST Agartala',
        url: 'https://btcstagartala.org/',
      },
      about: {
        '@type': 'EducationalOrganization',
        name: "Bhavan's Tripura College of Science & Technology",
      },
    };
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};
