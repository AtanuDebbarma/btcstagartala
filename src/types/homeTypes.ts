import {Timestamp} from 'firebase/firestore';

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
  url: string;
};

/**
 * Represents types for Carousel mode
 */
export type CarouselModeType = 'ADD' | 'DELETE' | 'EDIT' | 'DIM' | '';

/**
 * Represents types for Firebase Backend Corusel Images
 */
export type CarouselImage = {
  id: string;
  imageUrl: string;
  imageOrder: number;
  image_public_id: string;
  createdAt: Timestamp | null;
};
/**
 * Represents types for Firebase Backend ProspectusAndAdmissionForm.
 */
export type ProspectusAndAdmissionFormType = {
  id: string;
  url: string;
  name: 'Prospectus' | 'Admission_Form' | string;
  public_id: string;
  createdAt: Timestamp | null;
};

/**
 * Represents types for Firebase Backend NoticeBoard table cointent.
 */
export type NoticeBoardType = {
  id: string;
  name: string;
  url: string;
  public_id: string;
  createdAt: Timestamp | null;
};

export type AlertsType = {
  id: string;
  title: string;
  content: string;
  fileName: string;
  fileURL: string;
  file_public_id: string;
  link1Name: string;
  link1Url: string;
  link2Name: string;
  link2Url: string;
  createdAt: Timestamp | null;
};

/**
 * Represents types for Firebase Backend SmallAboutCard.
 */
export type SmallAboutCardType = {
  id: string;
  text: string;
  bold_footer?: string; // Optional for principal_text
};

/**
 * Represents types for Firebase Backend SmallAboutCard Image.
 */
export type SmallAboutCardimageType = {
  id: string;
  url: string;
};
