import {useEffect, useRef, useCallback} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';
import {CarouselImage} from '@/types/homeTypes';
import {appStore} from '@/appStore/appStore';

export const useFetchCarouselImages = () => {
  const isMountedRef = useRef<boolean>(false);

  const setCarouselImages = appStore(state => state.setCarouselImages);
  const setLoading = appStore(state => state.setLoading);
  const setError = appStore(state => state.setError);

  const fetchCarouselImages = useCallback(async () => {
    await setLoading(true);
    try {
      const carouselRef = collection(db, 'carouselImages');
      const q = query(carouselRef, orderBy('imageOrder'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const images: CarouselImage[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<CarouselImage, 'id'>),
        }));
        if (isMountedRef.current) {
          await setLoading(false);
          await setCarouselImages(images);
          console.log('Carousel images fetched successfully');
          await setError(null);
        }
      } else if (isMountedRef.current) {
        await setError(null);
        await setLoading(false);
        await setCarouselImages([]);
        console.error('Error fetching carousel images:');
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        console.error('Error fetching carousel images:', err);
        await setError('Failed to load carousel images.');
        await setCarouselImages([]);
        await setLoading(false);
      }
    }
  }, [setCarouselImages, setLoading, setError]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchCarouselImages();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchCarouselImages]);
};
