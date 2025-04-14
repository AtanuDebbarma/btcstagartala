import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';

export type Dimensions = {
  default: number;
  minWidth_410: number;
  minWidth_430: number;
  minWidth_820: number;
  minWidth_1024: number;
  objectFit: string;
};

export const defaultDimValues = {
  default: 350,
  minWidth_410: 375,
  minWidth_430: 400,
  minWidth_820: 430,
  minWidth_1024: 480,
  objectFit: 'cover',
};
export const useCarouselDimensions = (
  setDimensions: Dispatch<SetStateAction<Dimensions>>,
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef<boolean>(false);

  const fetchDimensions = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'carouselDimentions'));

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const data = firstDoc.data();

        if (isMountedRef.current) {
          setLoading(false);
          setDimensions({
            default: data.default ?? 350,
            minWidth_410: data.minWidth_410 ?? 375,
            minWidth_430: data.minWidth_430 ?? 400,
            minWidth_820: data.minWidth_820 ?? 430,
            minWidth_1024: data.minWidth_1024 ?? 480,
            objectFit: data.objectFit ?? 'cover',
          });
          setError(false);
        }
      } else {
        if (isMountedRef.current) {
          setError(false);
          setDimensions(defaultDimValues);
          setLoading(false);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error('Error fetching carousel dimensions:', err);
        setLoading(false);
        setError(true);
        setDimensions(defaultDimValues);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchDimensions();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchDimensions]);

  return {loading, error: !!error};
};
