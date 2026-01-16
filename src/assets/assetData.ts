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
      'https://www.btcstagartala.org/wp-content/uploads/2024/04/Screenshot-2024-04-19-at-10.12.35%E2%80%AFAM.png',
    backupCollege: backupCarousel,
    noticeBoardBanner: noticeBoardBanner,
    Principal_Fallback: Principal_Fallback,
  },
};

export const courses = [
  {
    name: 'B. Sc. Honours in Computer Science',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H. S. (+2) examination of TBSE/CBSE/ISC or its equivalent including National Open School with at least 45% marks in aggregate (40% for SC/ST/OBC) in Science Stream for B.Sc.(Hons.) Computer Science',
    combination: 'Computer Science with Mathematics and Statistics/Physics',
    firstYearFee: '₹47,000',
    semesterFee: '₹32,000',
  },
  {
    name: 'BBA (Bachelor of Business Administration)',
    duration: '3 Years (6 Sem.)',
    intake: '40',
    eligibility:
      'Candidates having passed the H.S.(+2) or its equivalent examination from any recognized Board/Council in any stream with minimum of 45% marks in aggregate (5% relaxation for SC/ST/OBC and physically challenged candidates)',
    combination: 'N/A',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,000',
  },
  {
    name: 'BIT (Bachelor of Information Technology)',
    duration: '3 Years (6 Sem.)',
    intake: '40',
    eligibility:
      'Minimum 45% aggregate for general and 40% aggregate for SC/ST/OBC candidates at class XII, preferably having Mathematics at H. S. (+2) level. Diploma in Computer Engineering / Computer Science / Computer Technology / Electrical Electronics and allied, Mechanical Engineering and allied, Civil and allied branches of Engineering are eligible. However the Diploma should be recognized by Board of Technical Education or any other recognized Government body.',
    combination: 'N/A',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,000',
  },
  {
    name: 'BMLT (B. Sc. in Medical Laboratory Technology)',
    duration: '3 Years (6 Sem.)',
    intake: '30',
    eligibility:
      '10+2 or equivalent in Chemistry, Physics, and Biology with 35% marks (5% relaxation for SC/ST/OBC candidates)',
    combination: 'N/A',
    totalFee: '₹1,68,000',
    yearlyFee: '₹56,000 per year',
  },
  {
    name: 'B. Sc. in Physics (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '20',
    eligibility:
      'H.S.(+2) Science or Equivalent Examination Passed from a recognized Board/University with pass in mathematics with Physics, Statistics, chemistry as combination subjects',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B. Sc. in Mathematics (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '20',
    eligibility:
      'H.S.(+2) Science or Equivalent Examination Passed from a recognized Board/University with pass in mathematics with Physics, Statistics, chemistry as combination subjects',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B. A. in English (Major/Honours/Research)',
    duration: '3/4 Years (6/8 Sem.)',
    intake: '30',
    eligibility:
      'H.S.(+2) Science or Equivalent Examination Passed from a recognized Board/University with pass in mathematics with Physics, Statistics, chemistry as combination subjects',
    combination: 'As per University guidelines',
    firstYearFee: '₹35,000',
    semesterFee: '₹26,500',
  },
  {
    name: 'B. Sc. Honours in Electronics',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H. S. (+2) examination of TBSE/CBSE/ISC or its equivalent including National Open School with at least 45% marks in aggregate (40% for SC/ST/OBC) in Science Stream for B.Sc.(Hons.) Electronics',
    combination: 'Electronics Science with Physics and Statistics/Mathematics',
    firstYearFee: '₹47,000',
    semesterFee: '₹32,000',
  },
  {
    name: 'B. Sc. Pass with Computer Science, Electronics, Mathematics and Physics',
    duration: '3 Years (1+1+1)',
    intake: '30',
    eligibility:
      'H.S.(+2) Science or Equivalent Examination Passed from a recognized Board/University with pass in mathematics with Physics, Statistics, chemistry as combination subjects',
    combination: 'Prescribed combination subjects',
    firstYearFee: '₹18,000',
    yearlyFee: '₹15,000 per year',
  },
];

export const feeStructure = [
  {
    course: 'B.Sc. (Hons.) in Computer Science / Electronics',
    admission: '₹10,000',
    development: '₹5,000',
    tuitionPerSem: '₹30,000',
    otherFees: '₹2,000/sem (Laboratory + Library, Magazine, Games & sports)',
    firstSemTotal: '₹47,000',
    laterSemTotal: '₹32,000/sem',
  },
  {
    course: 'BBA & B. Sc. (IT) / BIT',
    admission: '₹7,000',
    development: '₹2,000',
    tuitionPerSem: '₹25,000',
    otherFees: '₹1,000/sem (Library, Magazine, Games & Sports, Cultural Fee)',
    firstSemTotal: '₹35,000',
    laterSemTotal: '₹26,000/sem',
  },
  {
    course: 'BMLT',
    admission: '₹7,000 (One Time i.e. at the time of Admission)',
    development: '₹5,000 (Per Year)',
    tuitionPerYear: '₹28,000 per semester',
    otherFees:
      '₹1,600 (Instrument Handling ₹6000 One Time Non-refundable + Sports and Cultural ₹1000 Per Year)',
    firstYearTotal: '₹56,000',
    totalCourse: 'Total Rs. 1,68,000',
  },
  {
    course: 'B. Sc. (PASS) COURSE',
    admission: '₹2,000',
    development: '₹1,000',
    tuitionPerYear: '₹12,000',
    otherFees: '₹3,000/year (Library, Magazine, Games & sports, Cultural Fee)',
    firstYearTotal: '₹18,000',
    laterYearTotal: '₹15,000/year',
  },
  {
    course: 'B. Sc. (Hons) in Physics, Mathematics and B. A. (Hons) in English',
    admission: '₹5,000',
    development: '₹3,000',
    tuitionPerSem: '₹25,000',
    otherFees: '₹1,500/sem (Laboratory + Library, Magazine, Games & sports)',
    firstSemTotal: '₹35,000',
    laterSemTotal: '₹26,500/sem',
  },
];
