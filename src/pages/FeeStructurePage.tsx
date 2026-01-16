import React from 'react';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';
import {courses, feeStructure, Assets} from '@/assets/assetData';
import {AcademicsInfoButton} from '@/components/academics/AcademicsInfoButton';
import {CourseCard} from '@/components/feeStructure/CourseCard';
import {ImportantNote} from '@/components/feeStructure/ImportantNote';

export default function FeeStructurePage(): React.JSX.Element {
  // Map fee structure to courses for easy lookup
  const getFeeForCourse = (
    courseName: string,
  ):
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
    | undefined => {
    if (
      courseName.includes('Computer Science') ||
      courseName.includes('Electronics')
    ) {
      return feeStructure.find(f =>
        f.course.includes('Computer Science / Electronics'),
      );
    }
    if (courseName.includes('BBA') || courseName.includes('BIT')) {
      return feeStructure.find(f => f.course.includes('BBA'));
    }
    if (courseName.includes('BMLT')) {
      return feeStructure.find(f => f.course.includes('BMLT'));
    }
    if (courseName.includes('Pass')) {
      return feeStructure.find(f => f.course.includes('PASS'));
    }
    if (
      courseName.includes('Physics') ||
      courseName.includes('Mathematics') ||
      courseName.includes('English')
    ) {
      return feeStructure.find(f => f.course.includes('Physics, Mathematics'));
    }
    return null;
  };

  return (
    <>
      <SEO {...pageSEO.feeStructure} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Same style as About/Academics/Facilities */}
        <div className="relative h-50 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-extrabold text-nowrap text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Fee Structure & Eligibility
            </h1>
            <p className="mt-4 text-base font-bold text-nowrap text-gray-200 drop-shadow-lg sm:mt-7 sm:text-xl md:text-2xl">
              Bhavan's Tripura College of Science & Technology
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src={Assets.link.noticeBoardBanner}
            alt="Fee Structure"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Courses Section */}
          <div className="space-y-12">
            {courses.map((course, index) => {
              const feeDetails = getFeeForCourse(course.name);

              return (
                <CourseCard
                  key={index}
                  course={course}
                  feeDetails={feeDetails}
                />
              );
            })}
          </div>

          <div className="mt-8">
            <AcademicsInfoButton />
          </div>

          {/* Important Note */}
          <ImportantNote />
        </div>
      </div>
    </>
  );
}
