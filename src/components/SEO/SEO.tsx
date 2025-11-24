import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultSEO = {
  title: "BTCST Agartala | Bhavan's Tripura College of Science & Technology",
  description:
    "Official website of Bhavan's Tripura College of Science & Technology (BTCST), affiliated to Tripura University. Offering quality education in Science & Technology in Agartala, Tripura.",
  keywords:
    "BTCST, Bhavan's Tripura College, Science and Technology College Tripura, Tripura University, Agartala College, Engineering College Tripura, Science College Agartala, Bharatiya Vidya Bhavan, North East India College",
  image: 'https://btcstagartala.org/og-image.jpg',
  url: 'https://btcstagartala.org',
  type: 'website',
};

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type,
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title || defaultSEO.title;

    // Update meta tags
    updateMetaTag('name', 'description', description || defaultSEO.description);
    updateMetaTag('name', 'keywords', keywords || defaultSEO.keywords);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title || defaultSEO.title);
    updateMetaTag(
      'property',
      'og:description',
      description || defaultSEO.description,
    );
    updateMetaTag('property', 'og:image', image || defaultSEO.image);
    updateMetaTag(
      'property',
      'og:url',
      url || `${defaultSEO.url}${location.pathname}`,
    );
    updateMetaTag('property', 'og:type', type || defaultSEO.type);

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', title || defaultSEO.title);
    updateMetaTag(
      'name',
      'twitter:description',
      description || defaultSEO.description,
    );
    updateMetaTag('name', 'twitter:image', image || defaultSEO.image);
    updateMetaTag(
      'name',
      'twitter:url',
      url || `${defaultSEO.url}${location.pathname}`,
    );

    // Update canonical link
    updateCanonicalLink(url || `${defaultSEO.url}${location.pathname}`);
  }, [title, description, keywords, image, url, type, location.pathname]);

  return null;
};

// Helper function to update meta tags
const updateMetaTag = (
  attribute: string,
  key: string,
  content: string,
): void => {
  let element = document.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

// Helper function to update canonical link
const updateCanonicalLink = (url: string): void => {
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

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "BTCST Agartala | Bhavan's Tripura College of Science & Technology",
    description:
      "Official website of Bhavan's Tripura College of Science & Technology (BTCST), affiliated to Tripura University. Explore our programs, faculty, and campus life.",
    keywords:
      "BTCST, Bhavan's Tripura College, Science College Tripura, Agartala College, Tripura University",
  },
  about: {
    title: 'About Us | BTCST Agartala',
    description:
      "Learn about Bhavan's Tripura College of Science & Technology, established in 2003. Our history, mission, and commitment to quality education in Tripura.",
    keywords:
      'About BTCST, College History, Bharatiya Vidya Bhavan, Tripura Education',
  },
  academics: {
    title: 'Academics | BTCST Agartala',
    description:
      'Explore academic programs at BTCST. We offer undergraduate and postgraduate courses in Science & Technology affiliated to Tripura University.',
    keywords:
      'BTCST Courses, Science Programs, Technology Courses, Tripura University Courses',
  },
  faculty: {
    title: 'Faculty | BTCST Agartala',
    description:
      'Meet our experienced faculty members at BTCST. Dedicated professors committed to excellence in teaching and research.',
    keywords: 'BTCST Faculty, College Teachers, Academic Staff Tripura',
  },
  gallery: {
    title: 'Gallery | BTCST Agartala',
    description:
      'View photos of BTCST campus, events, and activities. Glimpses of college life, infrastructure, and student achievements.',
    keywords: 'BTCST Photos, Campus Gallery, College Events, Student Life',
  },
  contact: {
    title: 'Contact Us | BTCST Agartala',
    description:
      'Get in touch with BTCST. Find our address, phone numbers, email, and location in Anandanagar, Agartala, Tripura.',
    keywords: 'Contact BTCST, College Address, Admission Enquiry, Agartala',
  },
  notices: {
    title: 'Notice Board | BTCST Agartala',
    description:
      'Latest notices, announcements, and updates from BTCST. Stay informed about important college notifications and circulars.',
    keywords: 'BTCST Notices, College Announcements, Important Updates',
  },
  alerts: {
    title: 'Alerts | BTCST Agartala',
    description:
      'Important alerts and urgent notifications from BTCST. Stay updated with critical information and announcements.',
    keywords: 'BTCST Alerts, Urgent Notifications, College Updates',
  },
  principalMessage: {
    title: "Principal's Message | BTCST Agartala",
    description:
      "Message from the Principal of Bhavan's Tripura College of Science & Technology. Vision and leadership for academic excellence.",
    keywords: 'Principal Message, College Leadership, BTCST Vision',
  },
};
