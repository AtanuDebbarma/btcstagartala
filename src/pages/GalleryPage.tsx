import React, {useState, useEffect} from 'react';
import {appStore} from '@/appStore/appStore';
import {GalleryImageType} from '@/types/galleryTypes';
import {GalleryModal} from '@/components/gallery/galleryModal';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import {
  fetchPage,
  fetchPageWithCursor,
  getGalleryImagesCount,
} from '@/services/gallery/galleryPagination';
import {QueryDocumentSnapshot, DocumentData} from 'firebase/firestore';
import {SEO} from '@/components/SEO/SEO';
import {pageSEO} from '@/components/SEO/seoConstants';

export default function GalleryPage(): React.JSX.Element {
  const user = appStore(state => state.user);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageData, setSelectedImageData] =
    useState<GalleryImageType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | 'DELETE'>('ADD');
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<GalleryImageType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const imagesPerPage = 15;

  // Track page cursors for efficient pagination
  const [pageCursors, setPageCursors] = useState<
    Map<number, QueryDocumentSnapshot<DocumentData> | null>
  >(new Map([[1, null]])); // Page 1 has no cursor

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  // Fetch total count on mount
  useEffect(() => {
    const fetchCount = async () => {
      const count = await getGalleryImagesCount();
      setTotalCount(count);
    };
    fetchCount();
  }, []);

  // Fetch images for current page with cursor optimization
  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);

      // Get cursor for previous page (if navigating sequentially)
      const previousPageCursor = pageCursors.get(currentPage - 1);

      // Fetch using cursor if available
      const {images, lastDoc} = await fetchPageWithCursor(
        currentPage,
        previousPageCursor || null,
      );

      setCurrentImages(images);

      // Store cursor for this page (for next page navigation)
      if (lastDoc) {
        setPageCursors(prev => new Map(prev).set(currentPage, lastDoc));
      }

      setLoading(false);
    };
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  // Note: pageCursors is intentionally excluded to prevent infinite loops - it's updated inside this effect

  // Refetch when modal closes (in case data changed)
  useEffect(() => {
    // Only refetch if modal was just closed (openModal changed from true to false)
    if (!openModal && currentImages.length > 0) {
      const refetch = async () => {
        const count = await getGalleryImagesCount();
        setTotalCount(count);

        // Clear cursors and refetch from scratch
        setPageCursors(new Map([[1, null]]));

        // Use offset method for refetch (data may have changed)
        const {images, lastDoc} = await fetchPage(currentPage);
        setCurrentImages(images);

        // Update cursor for current page
        if (lastDoc) {
          setPageCursors(prev => new Map(prev).set(currentPage, lastDoc));
        }
      };
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]); // Only refetch when modal state changes

  // Handle body overflow when modal is open/closed
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Calculate pagination
  const totalPages = Math.ceil(totalCount / imagesPerPage);
  const indexOfFirstImage = (currentPage - 1) * imagesPerPage + 1;
  const indexOfLastImage = Math.min(currentPage * imagesPerPage, totalCount);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleAddImage = () => {
    setModalMode('ADD');
    setSelectedImageData(null);
    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  const handleEditImage = (image: GalleryImageType) => {
    setModalMode('EDIT');
    setSelectedImageData(image);
    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  const handleDeleteImage = (image: GalleryImageType) => {
    setModalMode('DELETE');
    setSelectedImageData(image);
    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  return (
    <>
      <SEO {...pageSEO.gallery} />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="bg-linear-to-r from-[#3f003f] via-[#630063] to-[#900090] px-4 py-12 text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Gallery
            </h1>
            <p className="max-w-3xl text-base sm:text-lg md:text-xl">
              Glimpses of BTCST Campus & Activities
            </p>
          </div>
        </header>

        <section
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
          aria-label="Gallery Images">
          {/* Add Button for Admin */}
          {isAdmin && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={handleAddImage}
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95">
                <i className="fa-solid fa-plus"></i>
                Add Image
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mb-8 text-center text-gray-600">
              Loading images...
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && (
            <div
              className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              role="list">
              {currentImages.map(image => (
                <article
                  key={image.id}
                  onMouseEnter={() => {
                    if (isAdmin) {
                      setHoveredImageId(image.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isAdmin) {
                      setHoveredImageId(null);
                    }
                  }}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  role="listitem">
                  {/* Admin Controls */}
                  {isAdmin && hoveredImageId === image.id && (
                    <div className="absolute top-2 right-2 z-50 flex gap-2 rounded-full bg-white px-3 py-2 shadow-md">
                      <AdminInteractionBtns
                        handleModal={() => handleEditImage(image)}
                        iconClass="fa-solid fa-pen"
                        title="EDIT"
                        iconColor="text-blue-600"
                        hoverColor="hover:text-blue-800"
                      />
                      <AdminInteractionBtns
                        handleModal={() => handleDeleteImage(image)}
                        iconClass="fa-solid fa-trash"
                        title="DELETE"
                        iconColor="text-red-600"
                        hoverColor="hover:text-red-800"
                      />
                    </div>
                  )}

                  <figure>
                    <div
                      className={`relative h-64 w-full overflow-hidden ${!isAdmin ? 'cursor-pointer' : ''}`}
                      onClick={() => !isAdmin && handleImageClick(image.url)}>
                      <img
                        src={image.url}
                        alt={image.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40">
                        <svg
                          className="h-12 w-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                    <figcaption
                      className={`p-4 ${isAdmin ? 'cursor-pointer' : ''}`}
                      onClick={() => isAdmin && handleImageClick(image.url)}>
                      <p
                        className={`text-center text-sm font-medium text-gray-700 sm:text-base ${isAdmin ? 'hover:text-purple-800 hover:underline' : ''}`}>
                        {image.title}
                      </p>
                      {image.createdAt && (
                        <time
                          dateTime={image.createdAt.toDate().toISOString()}
                          className="block pt-2 text-center text-xs text-gray-600">
                          {convertFirebaseTimestampToDate(image.createdAt)}
                        </time>
                      )}
                    </figcaption>
                  </figure>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Gallery pagination"
              className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </button>

              {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium shadow-md transition-all duration-200 sm:px-4 sm:py-2 sm:text-base ${
                    currentPage === page
                      ? 'bg-[#900090] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}>
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </nav>
          )}

          {/* Image Count */}
          {!loading && totalCount > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600 sm:text-base">
              Showing {indexOfFirstImage} - {indexOfLastImage} of {totalCount}{' '}
              images
            </div>
          )}
        </section>

        {/* Modal for Enlarged Image */}
        {selectedImage && (
          <div
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged image view"
            className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <button
                onClick={handleCloseModal}
                aria-label="Close enlarged image"
                className="absolute -top-2 -right-2 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-transform hover:scale-110 sm:-top-4 sm:-right-4 sm:p-3">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <img
                src={selectedImage}
                alt="Enlarged view"
                loading="eager"
                className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Admin Modal */}
        {openModal && isAdmin && (
          <GalleryModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedImage={selectedImageData}
            mode={modalMode}
            totalCount={totalCount}
          />
        )}
      </main>
    </>
  );
}
