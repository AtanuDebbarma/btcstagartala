import {Assets} from '@/assets/assetData';
export type NoticeType = {
  id: number;
  name: string;
  url: string;
  createdAt: string; // ISO date string
  content: string;
};

// Sample notice data
export const notices: NoticeType[] = [
  {
    id: 1,
    name: '1st Phase Internship for B.Ed 2nd Semester (2024-26)',
    url: '/internship-details',
    createdAt: '2025-01-01T10:30:00Z',
    content:
      '1st Phase Internship for B.Ed 2nd Semester (2024-26) will start from 17-01-2025 to 29-01-2025.',
  },
  {
    id: 2,
    name: 'B.Ed 4th Semester Classes',
    url: '/classes-schedule',
    createdAt: '2024-12-20T09:15:00Z',
    content: 'B.Ed 4th Semester (2023-25) classes will start from 13-01-2025.',
  },
  {
    id: 3,
    name: 'Micro Teaching for B.Ed 2nd Semester',
    url: '/micro-teaching',
    createdAt: '2024-12-15T14:45:00Z',
    content:
      'Micro Teaching for B.Ed 2nd Semester (2024-26) will commence from 02-01-2025 to 16-01-2025.',
  },
  {
    id: 4,
    name: 'Youth Talent Search Festival',
    url: '/talent-search',
    createdAt: '2024-12-10T11:20:00Z',
    content: 'A Youth Talent Search Festival will be held on 9th January, 2025',
  },
  {
    id: 5,
    name: 'B.Ed & D.El.Ed Admission Form',
    url: '/admission',
    createdAt: '2024-12-05T16:30:00Z',
    content:
      'B.Ed & D.El.Ed Admission Form available from college office w.e.f. 04-02-2025 to 07-03-2025 (Exc',
  },
  {
    id: 6,
    name: 'Talk Show: National Education Day',
    url: '/education-day',
    createdAt: '2024-11-05T13:00:00Z',
    content: 'Talk Show: National Education Day - November 11, 2024',
  },
];

export type Accreditation = {
  id: number;
  name: string;
  logo: string;
  isMoreButton?: boolean; // optional flag
};
export const accreditations: Accreditation[] = [
  {
    id: 1,
    name: 'University Grants Commission',
    logo: Assets.link.ugc,
  },
  {
    id: 2,
    name: 'National Assessment and Accreditation Council',
    logo: Assets.link.naac,
  },
  {
    id: 3,
    name: 'Govt. of Tripura',
    logo: Assets.link.govTripura,
  },
  {
    id: 4,
    name: 'Tripura University',
    logo: Assets.link.tripuraUniv,
  },
  {
    id: 999,
    name: '',
    logo: '',
    isMoreButton: true, // custom flag
  },
];
