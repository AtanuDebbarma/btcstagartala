import topEmblemUrl from './logo-emblem.jpg';
import GovTripura from './GovTripura.jpg';
import UGC from './UGC.jpg';
import TripuraUniv from './TripuraUniv.jpg';
import NAAC from './NAAC.jpg';
import logo from './logo.jpg';

export type LinkType = {
  logo: string;
  topEmblem: string;
  govTripura: string;
  ugc: string;
  tripuraUniv: string;
  naac: string;
  aboutShortImg: string;
};

export const Assets: {link: LinkType} = {
  link: {
    logo: logo,
    topEmblem: topEmblemUrl,
    govTripura: GovTripura,
    ugc: UGC,
    tripuraUniv: TripuraUniv,
    naac: NAAC,
    aboutShortImg:
      'https://btcstagartala.org/wp-content/uploads/2024/04/Screenshot-2024-04-19-at-10.12.35%E2%80%AFAM.png',
  },
};
