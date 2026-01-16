import {useEffect} from 'react';
import {collection, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '@/services/firebase';
import {appStore} from '@/appStore/appStore';
import type {MiscDocumentType} from '@/types/miscDocumentsTypes';
import {logger} from '@/utils/logger';

export const useFetchMiscDocuments = () => {
  const setMiscDocuments = appStore(state => state.setMiscDocuments);

  useEffect(() => {
    const fetchMiscDocuments = async () => {
      try {
        const miscDocsRef = collection(db, 'misc-documents');
        const q = query(miscDocsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const documents: MiscDocumentType[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          documents.push({
            id: data.id || doc.id,
            name: data.name || '',
            url: data.url || '',
            createdAt: data.createdAt || null,
          });
        });

        await setMiscDocuments(documents);
        logger.info('[MISC DOCUMENTS] Fetched documents:', documents.length);
      } catch (error) {
        logger.error('[MISC DOCUMENTS] Error fetching documents:', error);
        await setMiscDocuments([]);
      }
    };

    void fetchMiscDocuments();
  }, [setMiscDocuments]);
};
