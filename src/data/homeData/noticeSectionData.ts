import {Assets} from '@/assets/assetData';
import {Accreditation} from '@/types/homeTypes';

export const accreditations: Accreditation[] = [
  {
    id: 2,
    name: 'All India Council for Technical Education',
    logo: Assets.link.aicte,
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
