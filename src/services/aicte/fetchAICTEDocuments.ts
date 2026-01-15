import {useEffect} from 'react';
import {collection, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '@/services/firebase';
import {appStore} from '@/appStore/appStore';
import type {AICTEDocumentType} from '@/types/aicteTypes';
import {logger} from '@/utils/logger';

export const useFetchAICTEDocuments = () => {
  const setAICTEDocuments = appStore(state => state.setAICTEDocuments);

  useEffect(() => {
    const fetchAICTEDocuments = async () => {
      try {
        const aicteRef = collection(db, 'aicte');
        const q = query(aicteRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const documents: AICTEDocumentType[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          documents.push({
            id: data.id || doc.id,
            name: data.name || '',
            url: data.url || '',
            createdAt: data.createdAt || null,
          });
        });

        await setAICTEDocuments(documents);
        logger.info('[AICTE] Fetched documents:', documents.length);
      } catch (error) {
        logger.error('[AICTE] Error fetching documents:', error);
        await setAICTEDocuments([]);
      }
    };

    void fetchAICTEDocuments();
  }, [setAICTEDocuments]);
};
