import topEmblemUrl from './logo-emblem.jpg';
import GovTripura from './GovTripura.jpg';
import UGC from './UGC.jpg';
import TripuraUniv from './TripuraUniv.jpg';
import NAAC from './NAAC.jpg';

export type LinkType = {
  logo: string;
  topEmblem: string;
  govTripura: string;
  ugc: string;
  tripuraUniv: string;
  naac: string;
  aboutShortImg: string;
};

export type CarouselType = {
  Image1: string;
  Image2: string;
  Image3: string;
  Image4: string;
  Image5: string;
  Image6: string;
  Image7: string;
  Image8: string;
  Image9: string;
};

export const Assets: {link: LinkType; carousel: CarouselType} = {
  link: {
    logo: 'https://btcstagartala.org/wp-content/uploads/2024/07/cropped-cropped-cropped-Bhavans_Tripura_Vidya_Mandir_logo-120x120.jpg',
    topEmblem: topEmblemUrl,
    govTripura: GovTripura,
    ugc: UGC,
    tripuraUniv: TripuraUniv,
    naac: NAAC,
    aboutShortImg:
      'https://btcstagartala.org/wp-content/uploads/2024/04/Screenshot-2024-04-19-at-10.12.35%E2%80%AFAM.png',
  },

  carousel: {
    Image1:
      'https://btcstagartala.org/wp-content/uploads/2024/05/FLASH-MOB3-2-1536x1152.jpg',
    Image2:
      'https://btcstagartala.org/wp-content/uploads/2024/05/IMG_1758-1-1536x1024.jpg',
    Image3:
      'https://btcstagartala.org/wp-content/uploads/2024/05/PHYSICS-LAB2-1536x1024.jpg',
    Image4:
      'https://btcstagartala.org/wp-content/uploads/2024/05/COLLEGE-TOP-VIEW-1536x771.png',
    Image5:
      'https://btcstagartala.org/wp-content/uploads/2024/05/IMG_1771-1-1536x1024.jpg',
    Image6:
      'https://btcstagartala.org/wp-content/uploads/2024/05/IMG_7163-1536x1178.jpg',
    Image7:
      'https://btcstagartala.org/wp-content/uploads/2024/05/CLASS-1536x1024.jpg',
    Image8:
      'https://btcstagartala.org/wp-content/uploads/2024/05/COMPUTER-LAB2-1536x745.jpg',
    Image9:
      'https://btcstagartala.org/wp-content/uploads/2024/05/HISTOLOGY-1536x864.jpg',
  },
};
