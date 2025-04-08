export const StatsBanner = () => {
  const stats = [
    {
      count: '2K+',
      label: 'Current Enrollments',
      iconClass: 'fa-solid fa-graduation-cap',
    },
    {
      count: '25+',
      label: 'Qualified Staff',
      iconClass: 'fa-solid fa-user-tie',
    },
    {
      count: '80+',
      label: 'Clubs & Activities',
      iconClass: 'fa-solid fa-building-columns',
    },
    {
      count: '100+',
      label: 'Active PTFA Members',
      iconClass: 'fa-solid fa-users',
    },
  ];

  return (
    <div className="w-full bg-blue-600 py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <i className={`${stat.iconClass} text-4xl text-amber-50`} />
            </div>
            <div className=" text-amber-50">
              <div className="text-3xl font-bold">{stat.count}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
