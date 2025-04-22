/**
 * Uploads an image to Cloudinary and returns the image data.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<{data: any | null}>} A promise that resolves to an object containing the image data.
 */

export async function uploadCarouselToCloudinary(file: File): Promise<{
  data: any | null;
}> {
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_CAROUSEL_PRESET,
  );
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return {data: null};
  }

  return {data: data};
}
