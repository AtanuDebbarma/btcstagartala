import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import type {AlertsType} from '@/types/homeTypes';
import {logger} from '../../utils/logger';

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
          logger.error('Alerts fetch failed');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setAlerts([]);
        logger.error('Alerts fetch failed', err);
      }
    }
  }, [setAlerts]);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchAlerts();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchAlerts]);
};
