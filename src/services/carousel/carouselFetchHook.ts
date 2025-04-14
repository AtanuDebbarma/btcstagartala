import {
  useEffect,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';
import {CarouselImage} from '@/types/homeTypes';

export const useFetchCarouselImages = (
  setCarouselImages: Dispatch<SetStateAction<CarouselImage[]>>,
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef<boolean>(false);

  const fetchCarouselImages = useCallback(async () => {
    setLoading(true);
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
          setLoading(false);
          setCarouselImages(images);
          setError(null);
        }
      } else if (isMountedRef.current) {
        setError(null);
        setLoading(false);
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        console.error('Error fetching carousel images:', err);
        setError('Failed to load carousel images.');
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchCarouselImages();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchCarouselImages]);

  return {loading, error};
};
