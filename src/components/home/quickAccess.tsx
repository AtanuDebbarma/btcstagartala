export const QuickAccess = () => {
  const links = [
    {title: 'IQAC', url: '#'},
    {title: 'Committee & Cells', url: '#'},
    {title: 'SSR', url: '#'},
    {title: 'Academic Calendar', url: '#'},
    {title: 'NAAC', url: '#'},
    {title: 'Admission', url: '#'},
    {title: 'Misc Documents', url: '#'},
    {title: 'Academic Module', url: '#'},
    {title: 'Help Desk', url: '#'},
    {title: 'AQAR', url: '#'},
  ];
  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center">
      <div className="flex w-[70%] flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Quick Access</h2>
        </div>
        <div className="relative">
          <div className="absolute top-0 -left-1 h-1 w-32 rounded-full bg-yellow-400"></div>
        </div>
      </div>
      <div className="mt-5 w-[70%] rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col">
          <div
            className={`xs:grid-cols-2 mt-6 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4`}>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="rounded-md bg-blue-100 px-4 py-3 text-center text-blue-800 transition-all duration-200 hover:bg-blue-200">
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
