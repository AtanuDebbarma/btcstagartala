import {useCallback, useEffect, useRef} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import type {AISHEDocumentType} from '@/types/aisheTypes';
import {logger} from '../../utils/logger';

export const useFetchAISHEDocuments = () => {
  const isMountedRef = useRef<boolean>(false);
  const setAISHEDocuments = appStore(state => state.setAISHEDocuments);

  const fetchAISHEDocuments = useCallback(async () => {
    try {
      const aisheRef = collection(db, 'aishe');
      const q = query(aisheRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data: AISHEDocumentType[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<AISHEDocumentType, 'id'>),
        }));

        if (isMountedRef.current) {
          await setAISHEDocuments(data);
        }
      } else {
        if (isMountedRef.current) {
          await setAISHEDocuments([]);
          logger.info('[AISHE] No documents found - collection is empty');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setAISHEDocuments([]);
        logger.error('[AISHE] Error fetching documents:', err);
      }
    }
  }, [setAISHEDocuments]);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchAISHEDocuments();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchAISHEDocuments]);
};
