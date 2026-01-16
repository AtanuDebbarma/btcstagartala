import {useEffect} from 'react';
import {collection, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '@/services/firebase';
import {appStore} from '@/appStore/appStore';
import type {ResultType} from '@/types/resultsTypes';
import {logger} from '@/utils/logger';

export const useFetchResults = () => {
  const setResults = appStore(state => state.setResults);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsRef = collection(db, 'results');
        const q = query(resultsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const documents: ResultType[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          documents.push({
            id: data.id || doc.id,
            name: data.name || '',
            url: data.url || '',
            createdAt: data.createdAt || null,
          });
        });

        await setResults(documents);
        logger.info('[RESULTS] Fetched documents:', documents.length);
      } catch (error) {
        logger.error('[RESULTS] Error fetching documents:', error);
        await setResults([]);
      }
    };

    void fetchResults();
  }, [setResults]);
};
