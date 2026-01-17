import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './firebase';
import {appStore} from '@/appStore/appStore';
import type {
  ProspectusAndAdmissionFormType,
  PermanentAffiliationType,
} from '@/types/homeTypes';
import {logger} from '../utils/logger';

export const useFetchProspectusAndAdmissionForm = () => {
  const isMountedRef = useRef<boolean>(false);
  const setProspectusAndAdmission = appStore(
    state => state.setProspectusAndAdmission,
  );
  const setPermanentAffiliation = appStore(
    state => state.setPermanentAffiliation,
  );

  const fetchProspectus = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'prospectusAndAdmission'),
      );

      if (!querySnapshot.empty) {
        const allData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<
            ProspectusAndAdmissionFormType | PermanentAffiliationType,
            'id'
          >),
        }));

        if (isMountedRef.current) {
          // Separate permanent affiliation from prospectus/admission documents
          const permanentAffiliationDoc = allData.find(
            item => item.name === 'Permanent_Affiliation',
          ) as PermanentAffiliationType | undefined;

          const prospectusAndAdmissionDocs = allData.filter(
            item =>
              item.name === 'Prospectus' || item.name === 'Admission_Form',
          ) as ProspectusAndAdmissionFormType[];

          // Set permanent affiliation document
          await setPermanentAffiliation(permanentAffiliationDoc || null);

          // Set prospectus and admission documents
          await setProspectusAndAdmission(prospectusAndAdmissionDocs);

          logger.info(
            '[PROSPECTUS] Fetched documents:',
            prospectusAndAdmissionDocs.length,
          );
          logger.info(
            '[PERMANENT_AFFILIATION] Found:',
            !!permanentAffiliationDoc,
          );
        }
      } else {
        if (isMountedRef.current) {
          await setProspectusAndAdmission([]);
          await setPermanentAffiliation(null);
          logger.info('[PROSPECTUS] No documents found - collection is empty');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setProspectusAndAdmission([]);
        await setPermanentAffiliation(null);
        logger.error('[PROSPECTUS] Error fetching documents:', err);
      }
    }
  }, [setProspectusAndAdmission, setPermanentAffiliation]);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchProspectus();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchProspectus]);
};
