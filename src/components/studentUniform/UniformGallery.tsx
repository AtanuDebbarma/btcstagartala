import React from 'react';

interface UniformGalleryProps {
  photos: Array<{
    id: number;
    alt: string;
    placeholder: string;
  }>;
}

export function UniformGallery({
  photos,
}: UniformGalleryProps): React.JSX.Element {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
          Uniform Gallery
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 sm:text-lg">
          Official dress code for all students
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <img
              src={photo.placeholder}
              alt={photo.alt}
              loading="lazy"
              className="h-96 w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
