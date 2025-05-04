export const principal: FacultyCardDataType = {
  name: 'Mr. Partha Pratim Banik',
  degrees: 'M.Tech (CSE), B.Tech (CSE)',
  position: 'Principal',
  image:
    'https://btcstagartala.org/wp-content/uploads/2024/05/WhatsApp_Image_2024-05-16_at_6.55.25_PM-removebg-preview.png',

  details: {
    designation: 'PRINCIPAL I/C',
    address:
      'Ram Thakur Road. Town Pratapgarh. P.O. Agartala College, Agartala, West Tripura,Pin-799004',
    contact: '(0381) 286-1210 (O) +91-9436127328 (What’s App) / +91-8787641388',
    email: 'banikparthapratim@gmail.com',
  },
};

export const professors: FacultyCardDataType[] = [
  {
    name: 'Siddhartha Choudhury',
    degrees: 'M. Sc (IT), M. Tech (CSE)',
    position: 'Assistant Professor',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/Siddhartha-Choudhury.jpg',

    details: {
      designation: 'Asst. Prof. (IT)',
      address:
        'Town Bardowali, Mantri Bari Road Extension, Near Netaji Chowmuhani, Agartala, West Tripura, Pin-799001',
      contact: '(0381) 286-1210 (O) +91- 8837285181(WhatsApp) / 9774012784',
      email: 'siddchou@gmail.com',
    },
  },
  {
    name: 'Rupak Chakraborty',
    degrees: 'MBA',
    position: 'Assistant Professor',
    image: 'https://btcstagartala.org/wp-content/uploads/2024/05/Rupak.jpg',
    details: {
      designation: 'Asst. Prof. (MANAGEMENT)',
      address: 'Indranagar, Near Siksha Niketan School, Agartala, West Tripura',
      contact: '+91-9436451658',
    },
  },
  {
    name: 'Dr. Shilpi Saha',
    degrees: 'M.Sc (Human Physiology), SLET, PhD',
    position: 'Assistant Professor',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/Shilpi-Saha-BMLT.jpg',
    details: {
      designation: 'Asst. Prof. (MLT)',
      address:
        'W/O. Dr. Satyapriya Roy, Behind MGM H/S School, Near Popular Chemical, Adarshapalli. P.O. Agartala College. Agartala, West Tripura, Pin-799004',
      contact: '+91-9612546814',
      email: 'shilpisaha_07@yahoo.com',
    },
  },
  {
    name: 'Anupam Roy',
    degrees: 'BE (CSE), MBA (Marketing)',
    position: 'Assistant Professor',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/Anupam-Roy-scaled.jpg',

    details: {
      designation: 'Asst. Prof. (MANAGEMENT)',
      address: 'Shib Nagar, Modern Club, Agartala College, West Tripura',
      contact: '+91-8794563684',
      email: 'anupam13roy@gmail.com',
    },
  },
  {
    name: 'Shauli Roy',
    degrees: 'B.Sc, M.Sc (Medical Microbiology)',
    position: 'Assistant Professor',
    image: 'https://btcstagartala.org/wp-content/uploads/2024/05/shaoli.jpg',

    details: {
      designation: 'Asst. Prof. (MLT)',
      address:
        'C/O. Shibani Kutir, Dhaleswar, Nutan Palli. Road No. 6 (Opp. Prantik Club), Agartala, West Tripura, Pin-799007',
      contact: '+91-8416084729',
      email: 'shaoliroy1234@gmail.com',
    },
  },
];

export interface FacultyCardDataType {
  name: string;
  degrees?: string;
  position: string;
  image: string;
  details: {
    designation: string;
    category?: string;
    address: string;
    contact: string;
    email?: string;
  };
}

export const nonTeacthingStaff: FacultyCardDataType[] = [
  {
    name: 'Chandra Shekhar Chakroborty',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/ChandraSekherChakraborty.jpg',

    details: {
      designation: 'Office Supdt.',
      category: 'Permanent',
      address: 'West Dukli, Madhuban, Tripura (West)',
      contact: '+91-9436468794',
      email: 'cschakraborty2012@gmail.com',
    },
  },
  {
    name: 'Kuntal Majumder',
    degrees: 'BMLT, MMLT',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/Kuntal-Majumder.jpg',

    details: {
      designation: 'Lab. Instructor',
      category: 'ADHOC',
      address:
        'Krishnanagar, Pragati Road, Agartala, Tripura (W), Pin - 799001',
      contact: '+91-7005825447',
      email: 'kuntalmajumder18@gmail.com',
    },
  },
  {
    name: 'Subrata Sarkar',
    degrees: 'BMLT, D. Pharma',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/Subrata-Sarkar.jpg',

    details: {
      designation: 'Lab. Technician',
      category: 'ADHOC',
      address: 'Anandanagar 7 No. Para, West Tripura, Pin - 799004',
      contact: '+91-8787548589',
      email: 'Sarkarsubrata472@gmail.com',
    },
  },
  {
    name: 'Kanai Dhanuk',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/KanaiDhanuk.jpg',

    details: {
      designation: 'Group D',
      category: 'Regular',
      address:
        'Residential Address : 79 Tilla, Near GB Cancer Hospital, Agartala, West Tripura, Pin - 799006',
      contact: '+91-7005540885',
      email: 'btcst15@gmail.com',
    },
  },
  {
    name: 'Manik Kumar Dey',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/ManikKumarDey.jpg',

    details: {
      designation: 'Night Guard',
      category: 'ADHOC',
      address: 'Anandanagar, Near College, West Tripura, Pin - 799028',
      contact: '+91-9612449348',
      email: 'btcst15@gmail.com',
    },
  },
  {
    name: 'Pijush Banik',
    position: 'Non Teaching Staff',
    image:
      'https://btcstagartala.org/wp-content/uploads/2024/05/PijushBanik.jpg',

    details: {
      designation: 'Group D',
      category: 'Permanent',
      address: 'Anandanagar, Agartala, West Tripura, Pin - 799004',
      contact: '+91-8731078218',
      email: 'btcst15@gmail.com',
    },
  },
];
