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
  image: 'https://www.btcstagartala.org/logo.webp',
  url: 'https://www.btcstagartala.org',
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
