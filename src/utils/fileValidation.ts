/**
 * Checks if a given File object has a valid image MIME type.
 *
 * @param {File} file - File object to validate.
 * @returns An object with a single property 'error' set to `true` if the file type is invalid, or `false` if it is valid.
 */
export const validateImageFileType = (file: File): {error: boolean} => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/bmp',
    'image/webp',
  ];

  if (allowedMimeTypes.includes(file.type)) {
    return {error: false}; // Valid file type
  } else {
    return {error: true};
  }
};

export const validatePDFType = (
  file: File,
): {error: boolean; message: string} => {
  const allowedMimeTypes = ['application/pdf'];
  const maxSizeInBytes = 2.6 * 1024 * 1024; // 2.5 MB

  if (!allowedMimeTypes.includes(file.type)) {
    return {error: true, message: 'Only PDF files are allowed.'};
  }

  if (file.size > maxSizeInBytes) {
    return {
      error: true,
      message: 'File size must be less than or equal to 2.6 MB.',
    };
  }

  return {error: false, message: ''};
};
