import {useEffect, useCallback, useRef} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../firebase';

/**
 * Generic hook for fetching text and image documents from Firestore
 * Reduces duplication between fetchSmallAboutCard and fetchPrincipalData
 */
export const useGenericFetchTextAndImage = <T, I>(
  collectionName: string,
  textDocId: string,
  imageDocId: string,
  setTextData: (data: T | null) => Promise<void>,
  setImageData: (data: I | null) => Promise<void>,
  logPrefix: string,
) => {
  const isMountedRef = useRef<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      // Fetch text document
      const textDocRef = doc(db, collectionName, textDocId);
      const textDocSnap = await getDoc(textDocRef);

      if (textDocSnap.exists() && isMountedRef.current) {
        const textData: T = {
          id: textDocSnap.id,
          ...(textDocSnap.data() as Omit<T, 'id'>),
        } as T;
        await setTextData(textData);
      } else {
        if (isMountedRef.current) {
          await setTextData(null);
          console.error(`${logPrefix} text document not found`);
        }
      }

      // Fetch image document
      const imageDocRef = doc(db, collectionName, imageDocId);
      const imageDocSnap = await getDoc(imageDocRef);

      if (imageDocSnap.exists() && isMountedRef.current) {
        const imageData: I = {
          id: imageDocSnap.id,
          ...(imageDocSnap.data() as Omit<I, 'id'>),
        } as I;
        await setImageData(imageData);
      } else {
        if (isMountedRef.current) {
          await setImageData(null);
          console.error(`${logPrefix} image document not found`);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setTextData(null);
        await setImageData(null);
        console.error(`${logPrefix} fetch failed`, err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, textDocId, imageDocId, logPrefix]);
  // Note: setTextData and setImageData are stable Zustand setters and don't need to be in dependencies

  useEffect(() => {
    isMountedRef.current = true;
    fetchData();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchData]);
};
