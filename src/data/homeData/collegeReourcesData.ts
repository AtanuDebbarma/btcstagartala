import {RouteNames} from '@/constants/routeNames';
import type {CollegeResourcesTypes} from '@/types/homeTypes';

export const resources: CollegeResourcesTypes[] = [
  {
    title: 'Co-curricular Activities',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/football-1.jpg',
    alt: 'College Activites',
    url: RouteNames.ACTIVITIES,
  },
  {
    title: 'Gallery',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/IMG_1771-scaled.jpg',
    alt: 'Gallery',
    url: '/gallery',
  },
  {
    title: 'Our Faculty',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/WhatsApp_Image_2024-05-16_at_6.55.25_PM-removebg-preview.png',
    alt: 'Students engaging in physical education activities outdoors',
    url: RouteNames.FACULTY,
  },
  {
    title: 'Students Uniform',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/IMG_7163-1536x1178.jpg',
    alt: 'Students Uniform',
    url: RouteNames.STUDENT_UNIFORM,
  },
];
