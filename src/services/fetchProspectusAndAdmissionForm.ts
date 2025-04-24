import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './firebase';
import {appStore} from '@/appStore/appStore';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';

export const useFetchProspectusAndAdmissionForm = () => {
  const isMountedRef = useRef<boolean>(false);
  const {setProspectusAndAdmission} = appStore(state => ({
    setProspectusAndAdmission: state.setProspectusAndAdmission,
  }));

  const fetchProspectus = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'prospectusAndAdmission'),
      );

      if (!querySnapshot.empty) {
        const data: ProspectusAndAdmissionFormType[] = querySnapshot.docs.map(
          doc => ({
            id: doc.id,
            ...(doc.data() as Omit<ProspectusAndAdmissionFormType, 'id'>),
          }),
        );

        if (isMountedRef.current) {
          await setProspectusAndAdmission(data);
          console.log('ProspectusAndAdmission fetched successfully');
        }
      } else {
        if (isMountedRef.current) {
          await setProspectusAndAdmission([]);
          console.error('ProspectusAndAdmission fetch failed');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setProspectusAndAdmission([]);
        console.error('ProspectusAndAdmission fetch failed', err);
      }
    }
  }, [setProspectusAndAdmission]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchProspectus();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchProspectus]);
};
