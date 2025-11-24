import React from 'react';
import {appStore} from '@/appStore/appStore';
import {useFetchCollegeResources} from '@/services/collegeResources/fetchCollegeResources';

/**
 * Example component showing how to use College Resources
 * This fetches all 4 documents from the collegeResources collection
 */
export default function CollegeResourcesExample(): React.JSX.Element {
  // Fetch college resources on mount
  useFetchCollegeResources();

  // Get resources from store
  const collegeResources = appStore(state => state.collegeResources);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          College Resources
        </h1>

        {collegeResources.length === 0 ? (
          <p className="text-gray-600">Loading resources...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collegeResources.map(resource => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-white p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <i className="fa-solid fa-file-pdf text-2xl text-purple-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {resource.name}
                  </h3>
                  <p className="mt-2 text-sm text-purple-600">
                    View Resource →
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
