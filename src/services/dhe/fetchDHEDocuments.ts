import {useCallback, useEffect, useRef} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import type {DHEDocumentType} from '@/types/dheTypes';
import {logger} from '../../utils/logger';

export const useFetchDHEDocuments = () => {
  const isMountedRef = useRef<boolean>(false);
  const setDHEDocuments = appStore(state => state.setDHEDocuments);

  const fetchDHEDocuments = useCallback(async () => {
    try {
      const dheRef = collection(db, 'dhe');
      const q = query(dheRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data: DHEDocumentType[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<DHEDocumentType, 'id'>),
        }));

        if (isMountedRef.current) {
          await setDHEDocuments(data);
        }
      } else {
        if (isMountedRef.current) {
          await setDHEDocuments([]);
          logger.info('[DHE] No documents found - collection is empty');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setDHEDocuments([]);
        logger.error('[DHE] Error fetching documents:', err);
      }
    }
  }, [setDHEDocuments]);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchDHEDocuments();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchDHEDocuments]);
};
