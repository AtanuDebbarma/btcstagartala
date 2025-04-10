/**
 * Represents types for Notice Board
 */
export type NoticeType = {
  id: number;
  name: string;
  url: string;
  createdAt: string; // ISO date string
  content: string;
};

/**
 * Represents types for Accreditation section
 */
export type Accreditation = {
  id: number;
  name: string;
  logo: string;
  isMoreButton?: boolean; // optional flag
};

/**
 * Represents types for Banner section
 */
export type BannerClasses =
  | 'fa-solid fa-graduation-cap'
  | 'fa-solid fa-user-tie'
  | 'fa-solid fa-building-columns'
  | 'fa-solid fa-users';

export type StatsBannerTypes = {
  count: string;
  label: string;
  iconClass: BannerClasses;
};

/**
 * Represents types for College Resources section
 */
export type CollegeResourcesTypes = {
  title: string;
  image: string;
  alt: string;
};
