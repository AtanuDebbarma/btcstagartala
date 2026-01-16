import React from 'react';
import {feeStructure} from '@/assets/assetData';

export function FeeStructureSection(): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl lg:text-4xl">
          Fee Structure
        </h2>
        <div className="overflow-x-auto">
          <div className="space-y-6">
            {feeStructure.map((fee, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 sm:p-5">
                <h3 className="mb-4 text-lg font-bold text-[#900090] sm:text-xl">
                  {fee.course}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex justify-between rounded bg-gray-50 p-3">
                    <span className="text-sm font-medium text-gray-700 sm:text-base">
                      Admission Fee:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">
                      {fee.admission}
                    </span>
                  </div>
                  <div className="flex justify-between rounded bg-gray-50 p-3">
                    <span className="text-sm font-medium text-gray-700 sm:text-base">
                      Development Fee:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">
                      {fee.development}
                    </span>
                  </div>
                  <div className="flex justify-between rounded bg-gray-50 p-3">
                    <span className="text-sm font-medium text-gray-700 sm:text-base">
                      Tuition Fee:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">
                      {fee.tuitionPerSem || fee.tuitionPerYear}
                    </span>
                  </div>
                  <div className="flex justify-between rounded bg-gray-50 p-3">
                    <span className="text-sm font-medium text-gray-700 sm:text-base">
                      Other Fees:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">
                      {fee.otherFees}
                    </span>
                  </div>
                  <div className="flex justify-between rounded bg-blue-100 p-3">
                    <span className="text-sm font-bold text-gray-800 sm:text-base">
                      1st Semester/Year:
                    </span>
                    <span className="text-sm font-bold text-[#900090] sm:text-base">
                      {fee.firstSemTotal || fee.firstYearTotal}
                    </span>
                  </div>
                  <div className="flex justify-between rounded bg-blue-100 p-3">
                    <span className="text-sm font-bold text-gray-800 sm:text-base">
                      Later Period:
                    </span>
                    <span className="text-sm font-bold text-[#900090] sm:text-base">
                      {fee.laterSemTotal ||
                        fee.laterYearTotal ||
                        fee.totalCourse}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-lg bg-yellow-50 p-4 sm:p-5">
          <p className="text-sm font-medium text-gray-800 sm:text-base">
            <span className="font-bold">Note:</span> University Registration and
            Examination Fees are to be paid separately as notified by Tripura
            University (A Central University).
          </p>
        </div>
      </div>
    </section>
  );
}
