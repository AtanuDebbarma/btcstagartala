export const RouteNames = {
  DEFAULT: '/',
  HOME: '/home',
  ADMIN: '/admin',
  ABOUT: '/about',
  ACADEMICS: '/academics',
  ACTIVITIES: '/activities',
  CONTACT: '/contact',
  PRINCIPAL_MESSAGE: '/principal-message',
  RULES_REGULATIONS: '/rules-regulations',
  FEE_STRUCTURE: '/fee-structure',
  ADMISSION_ELIGIBILITY: '/admission-eligibility',
  FACULTY: '/faculty',
  FUTURE_PROGRAMMES: '/future-programmes',
  STUDENT_UNIFORM: '/student-uniform',
  RESULT: '/result',
  ACADEMIC_PERFORMANCE: '/academic-performance',
  NOTICE_BOARD: '/notice-board',
  ALERTS: '/alerts',
} as const;

export type RouteNamesType = (typeof RouteNames)[keyof typeof RouteNames];
