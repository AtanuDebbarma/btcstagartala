const links = [
  'Home',
  'About',
  'Academics',
  'Activities',
  'Contact',
  'Principal’s Message',
  'Rules & Regulations',
  'Fee Structure',
  'Admission Eligibility',
  'Faculty',
  'Future Programmes',
  'Student Uniform',
  'Result',
  'Academic Performance',
];

export const NavLinks = () => (
  <div className="hidden md:flex flex-wrap justify-center text-sm">
    {links.map(item => (
      <a href="#" key={item} className="px-3 py-3 hover:bg-blue-700">
        {item}
      </a>
    ))}
  </div>
);

export const MobileLinks = () => (
  <div className="flex flex-col space-y-4 mt-8">
    {links.map(item => (
      <a key={item} href="#" className="py-2 text-lg border-b border-white">
        {item}
      </a>
    ))}
  </div>
);
