const newsData = [
  {
    text: 'NSS Special Camp w.e.f 31-01-2025 to 06-02-2025.',
    isNew: true,
  },
  {
    text: '1st Phase Internship for B.Ed 2nd Semester (2024-26) will start from 17-01-2025 to 29-01-2025.',
    isNew: true,
  },
  {
    text: 'B.Ed 4th Semester Exam Notification Out.',
    isNew: true,
  },
];

export default function NewsTicker() {
  // Create a duplicate array to ensure seamless looping
  const duplicatedNews = [...newsData, ...newsData];

  return (
    <div className="flex w-full items-center overflow-hidden bg-gray-300">
      <div className="bg-yellow-500 px-4 py-2 font-bold whitespace-nowrap text-black">
        Alerts:
      </div>
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <div className="animate-ticker inline-block">
          {duplicatedNews.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-4 text-sm text-gray-900 md:text-base">
              {item.isNew && (
                <span className="animate-blink rounded-sm px-1 font-bold text-red-600">
                  NEW
                </span>
              )}
              <span className="pl-1.5">{item.text}</span>
              <span className="mx-2">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
