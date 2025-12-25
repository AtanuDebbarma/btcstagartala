import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import {defaultDimValues} from '@/appStore/carousel/carouselDimentionsSlice';
import {logger} from '../../utils/logger';

export type Dimensions = {
  default: number;
  minWidth_410: number;
  minWidth_430: number;
  minWidth_820: number;
  minWidth_1024: number;
  objectFit: string;
};

export const useCarouselDimensions = () => {
  const isMountedRef = useRef<boolean>(false);
  const setDimensions = appStore(state => state.setDimensions);
  const setDimLoading = appStore(state => state.setDimLoading);
  const setDimError = appStore(state => state.setDimError);

  const fetchDimensions = useCallback(async () => {
    await setDimLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'carouselDimentions'));

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const data = firstDoc.data();

        if (isMountedRef.current) {
          await setDimLoading(false);
          await setDimensions({
            default: data.default ?? 350,
            minWidth_410: data.minWidth_410 ?? 375,
            minWidth_430: data.minWidth_430 ?? 400,
            minWidth_820: data.minWidth_820 ?? 430,
            minWidth_1024: data.minWidth_1024 ?? 480,
            objectFit: data.objectFit ?? 'cover',
          });
          await setDimError(false);
        }
      } else {
        if (isMountedRef.current) {
          await setDimError(false);
          await setDimensions(defaultDimValues);
          await setDimLoading(false);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        logger.error('Error fetching carousel dimensions:', err);
        await setDimLoading(false);
        await setDimError(true);
        await setDimensions(defaultDimValues);
      }
    }
  }, [setDimError, setDimLoading, setDimensions]);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchDimensions();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchDimensions]);
};
