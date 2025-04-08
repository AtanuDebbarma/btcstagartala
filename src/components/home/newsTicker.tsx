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
    <div className="w-full bg-gray-300 flex items-center overflow-hidden">
      <div className="font-bold px-4 py-2 bg-yellow-500 text-black whitespace-nowrap">
        Alerts:
      </div>
      <div className="overflow-hidden whitespace-nowrap w-full relative">
        <div className="animate-ticker inline-block">
          {duplicatedNews.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-sm md:text-base text-gray-900 px-4">
              {item.isNew && (
                <span className="text-red-600 font-bold  px-1 rounded-sm animate-blink">
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
