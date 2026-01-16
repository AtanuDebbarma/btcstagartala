import React from 'react';

interface UniformDetailsProps {
  items: Array<{
    number: number;
    item: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export function UniformDetails({
  items,
}: UniformDetailsProps): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-6 py-4">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Dress-code/Uniform Details
          </h3>
          <p className="mt-2 text-sm text-gray-200">Same for Girls & Boys</p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map(item => (
              <div
                key={item.number}
                className="rounded-lg border-l-4 border-[#900090] bg-gray-50 p-5 transition-all duration-300 hover:bg-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#900090] text-white">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#900090] text-xs font-bold text-white">
                        {item.number}
                      </span>
                      <h4 className="text-lg font-bold text-gray-800">
                        {item.item}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
