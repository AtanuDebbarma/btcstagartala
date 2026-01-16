import React from 'react';

interface RuleCardProps {
  rule: {
    number: number;
    text: string;
    subPoints?: string[];
  };
}

export function RuleCard({rule}: RuleCardProps): React.JSX.Element {
  return (
    <div className="rounded-lg border-l-4 border-[#900090] bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100 sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#900090] text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base">
          {rule.number}
        </div>
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            {rule.text}
          </p>
          {rule.subPoints && (
            <ul className="mt-3 space-y-2 pl-4">
              {rule.subPoints.map((subPoint, subIndex) => (
                <li
                  key={subIndex}
                  className="flex items-start gap-2 text-sm text-gray-600 sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#900090]"></span>
                  <span className="flex-1">{subPoint}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
