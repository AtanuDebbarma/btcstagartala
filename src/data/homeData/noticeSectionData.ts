import {Assets} from '@/assets/assetData';
import {Accreditation} from '@/types/homeTypes';

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
