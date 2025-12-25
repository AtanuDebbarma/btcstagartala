import topEmblemUrl from './logo-emblem.webp';
import GovTripura from './GovTripura.webp';
import TripuraUniv from './TripuraUniv.webp';
import AICTE from './AICTE_LOGO.webp';
import logo from './logo.webp';
import backupCarousel from './backup-carousel.webp';
import noticeBoardBanner from './noticeBoardBanner.webp';
import Principal_Fallback from './Principal_Fallback.webp';

export type LinkType = {
  logo: string;
  topEmblem: string;
  govTripura: string;
  tripuraUniv: string;
  aicte: string;
  aboutShortImg: string;
  backupCollege: string;
  noticeBoardBanner: string;
  Principal_Fallback: string;
};

export const Assets: {link: LinkType} = {
  link: {
    logo: logo,
    topEmblem: topEmblemUrl,
    govTripura: GovTripura,
    tripuraUniv: TripuraUniv,
    aicte: AICTE,
    aboutShortImg:
      'https://btcstagartala.org/wp-content/uploads/2024/04/Screenshot-2024-04-19-at-10.12.35%E2%80%AFAM.png',
    backupCollege: backupCarousel,
    noticeBoardBanner: noticeBoardBanner,
    Principal_Fallback: Principal_Fallback,
  },
};

export const courses = [
  {
    name: 'B.Sc. Honours in Computer Science',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H.S. (+2) with at least 45% marks (40% for SC/ST/OBC) in Science Stream',
    combination: 'Mathematics and Statistics/Physics',
    firstYearFee: '₹47,000',
    semesterFee: '₹32,000',
  },
  {
    name: 'B.Sc. Honours in Electronics',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H.S. (+2) with at least 45% marks (40% for SC/ST/OBC) in Science Stream',
    combination: 'Physics and Statistics/Mathematics',
    firstYearFee: '₹47,000',
    semesterFee: '₹32,000',
  },
  {
    name: 'BIT (Bachelor of Information Technology)',
    duration: '3 Years (6 Sem.)',
    intake: '40',
    eligibility:
      'Minimum 45% aggregate (40% for SC/ST/OBC) at class XII, preferably having Mathematics',
    combination: 'N/A',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,000',
  },
  {
    name: 'BBA (Bachelor of Business Administration)',
    duration: '3 Years (6 Sem.)',
    intake: '40',
    eligibility:
      'H.S. (+2) or equivalent in any stream with minimum 45% marks (40% for SC/ST/OBC)',
    combination: 'N/A',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,000',
  },
  {
    name: 'BMLT (B.Sc. in Medical Laboratory Technology)',
    duration: '3 Years (6 Sem.)',
    intake: '30',
    eligibility:
      '10+2 in Chemistry, Physics, and Biology with 35% marks (30% for SC/ST/OBC)',
    combination: 'N/A',
    totalFee: '₹1,68,000',
    yearlyFee: '₹56,000 per year',
  },
  {
    name: 'B.Sc. in Physics (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '20',
    eligibility: 'H.S. (+2) in Science Stream with required combination',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B.Sc. in Mathematics (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '20',
    eligibility: 'H.S. (+2) in Science Stream with required combination',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B.A. in English (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '30',
    eligibility: 'H.S. (+2) in any stream with required combination',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B.Sc. Pass with Computer Science, Electronics, Mathematics and Physics',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H.S. (+2) Science with pass in Mathematics, Physics, Statistics, Chemistry',
    combination: 'Prescribed combination subjects',
    firstYearFee: '₹18,000',
    yearlyFee: '₹15,000 per year',
  },
];

export const feeStructure = [
  {
    course: 'B.Sc. (Hons.) Computer Science / Electronics',
    admission: '₹10,000',
    development: '₹5,000',
    tuitionPerSem: '₹30,000',
    otherFees: '₹2,000/sem',
    firstSemTotal: '₹47,000',
    laterSemTotal: '₹32,000/sem',
  },
  {
    course: 'BBA & BIT',
    admission: '₹7,000',
    development: '₹2,000',
    tuitionPerSem: '₹25,000',
    otherFees: '₹1,000/sem',
    firstSemTotal: '₹35,000',
    laterSemTotal: '₹26,000/sem',
  },
  {
    course: 'BMLT',
    admission: '₹7,000 (One Time)',
    development: '₹5,000/year',
    tuitionPerSem: '₹28,000',
    otherFees: '₹7,000 (Instrument + Sports)',
    firstYearTotal: '₹56,000',
    totalCourse: '₹1,68,000',
  },
  {
    course: 'B.Sc. (Pass) Course',
    admission: '₹2,000',
    development: '₹1,000',
    tuitionPerYear: '₹12,000',
    otherFees: '₹3,000/year',
    firstYearTotal: '₹18,000',
    laterYearTotal: '₹15,000/year',
  },
  {
    course: 'B.Sc./B.A. (Hons.) Physics, Maths, English',
    admission: '₹5,000',
    development: '₹3,000',
    tuitionPerSem: '₹25,000',
    otherFees: '₹1,500/sem',
    firstSemTotal: '₹35,000',
    laterSemTotal: '₹26,500/sem',
  },
];
