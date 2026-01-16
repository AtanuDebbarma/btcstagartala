import React from 'react';

interface CourseCardProps {
  course: {
    name: string;
    duration: string;
    intake: string;
    eligibility: string;
    combination: string;
  };
  feeDetails:
    | {
        course: string;
        admission: string;
        development: string;
        tuitionPerSem?: string;
        tuitionPerYear?: string;
        otherFees: string;
        firstSemTotal?: string;
        firstYearTotal?: string;
        laterSemTotal?: string;
        laterYearTotal?: string;
        totalCourse?: string;
      }
    | null
    | undefined;
}

export function CourseCard({
  course,
  feeDetails,
}: CourseCardProps): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Course Header */}
      <div className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-6 py-4">
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          {course.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-200">
          <span>Duration: {course.duration}</span>
          <span>•</span>
          <span>Intake: {course.intake}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Eligibility Criteria */}
        <div className="mb-6">
          <h4 className="mb-3 text-lg font-semibold text-gray-800">
            Eligibility Criteria
          </h4>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              {course.eligibility}
            </p>
            {course.combination !== 'N/A' && (
              <p className="mt-2 text-sm leading-relaxed text-gray-700 sm:text-base">
                <span className="font-medium">Combination:</span>{' '}
                {course.combination}
              </p>
            )}
          </div>
        </div>

        {/* Fee Structure */}
        {feeDetails && (
          <div>
            <h4 className="mb-3 text-lg font-semibold text-gray-800">
              Fee Structure
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Fee Type
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Admission Fee
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-medium text-gray-900">
                      {feeDetails.admission}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Development Fee
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-medium text-gray-900">
                      {feeDetails.development}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Tuition Fee
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-medium text-gray-900">
                      {feeDetails.tuitionPerSem || feeDetails.tuitionPerYear}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      Other Fees
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-medium text-gray-900">
                      {feeDetails.otherFees}
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800">
                      1st Semester/Year Total
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-bold text-[#900090]">
                      {feeDetails.firstSemTotal || feeDetails.firstYearTotal}
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800">
                      Later Semester/Year
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-bold text-[#900090]">
                      {feeDetails.laterSemTotal ||
                        feeDetails.laterYearTotal ||
                        feeDetails.totalCourse}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
