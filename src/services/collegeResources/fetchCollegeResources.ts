import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import {CollegeResourceType} from '@/types/collegeResourcesTypes';

/**
 * Hook to fetch all college resources (4 documents)
 * Fetches once on mount, no real-time listener
 */
export const useFetchCollegeResources = () => {
  const isMountedRef = useRef<boolean>(false);
  const setCollegeResources = appStore(state => state.setCollegeResources);

  const fetchResources = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'collegeResources'));

      if (!querySnapshot.empty) {
        const data: CollegeResourceType[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<CollegeResourceType, 'id'>),
        }));

        if (isMountedRef.current) {
          await setCollegeResources(data);
        }
      } else {
        if (isMountedRef.current) {
          await setCollegeResources([]);
          console.error('CollegeResources fetch failed - no documents found');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setCollegeResources([]);
        console.error('CollegeResources fetch failed', err);
      }
    }
  }, [setCollegeResources]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchResources();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchResources]);
};
