export type CarouselResponsiveType = {
  [key: string]: {
    breakpoint: {
      max: number;
      min: number;
    };
    items: number;
  };
};

export const responsive: CarouselResponsiveType = {
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1,
  },
  tablet: {
    breakpoint: {max: 1024, min: 820},
    items: 1,
  },
  mobile: {
    breakpoint: {max: 820, min: 766},
    items: 1,
  },
  smallMobile: {
    breakpoint: {max: 766, min: 580},
    items: 1,
  },
  extraSmall: {
    breakpoint: {max: 580, min: 430},
    items: 1,
  },
  tiny: {
    breakpoint: {max: 430, min: 350},
    items: 1,
  },
};
