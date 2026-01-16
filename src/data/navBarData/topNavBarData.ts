import type {RouteNamesType} from '@/constants/routeNames';
import {RouteNames} from '@/constants/routeNames';

export type NavLinkType = {
  name: string;
  path: RouteNamesType;
};

export const links: NavLinkType[] = [
  {name: 'Home', path: RouteNames.HOME},
  {name: 'About', path: RouteNames.ABOUT},
  {name: 'Academics', path: RouteNames.ACADEMICS},
  {name: 'Activities', path: RouteNames.ACTIVITIES},
  {name: 'Contact', path: RouteNames.CONTACT},
  {name: 'Principal’s Message', path: RouteNames.PRINCIPAL_MESSAGE},
  {name: 'Rules & Regulations', path: RouteNames.RULES_REGULATIONS},
  {name: 'Fee Structure', path: RouteNames.FEE_STRUCTURE},
  {name: 'Faculty', path: RouteNames.FACULTY},
  {name: 'Facilities', path: RouteNames.FACILITIES},
  {name: 'Student Uniform', path: RouteNames.STUDENT_UNIFORM},
  {name: 'Result', path: RouteNames.RESULT},
  {name: 'Academic Performance', path: RouteNames.ACADEMIC_PERFORMANCE},
];
