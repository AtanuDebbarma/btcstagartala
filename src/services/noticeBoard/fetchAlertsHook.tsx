import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import {AlertsType} from '@/types/homeTypes';

export const useFetchAlerts = () => {
  const isMountedRef = useRef<boolean>(false);
  const setAlerts = appStore(state => state.setAlerts);

  const fetchAlerts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'alerts'));

      if (!querySnapshot.empty) {
        const data: AlertsType[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<AlertsType, 'id'>),
        }));

        if (isMountedRef.current) {
          await setAlerts(data);
        }
      } else {
        if (isMountedRef.current) {
          await setAlerts([]);
          console.error('Alerts fetch failed');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setAlerts([]);
        console.error('Alerts fetch failed', err);
      }
    }
  }, [setAlerts]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchAlerts();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchAlerts]);
};
