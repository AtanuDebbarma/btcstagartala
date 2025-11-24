import {useEffect, useCallback, useRef} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {appStore} from '@/appStore/appStore';
import {NoticeBoardType} from '@/types/homeTypes';

export const useFetchNoticeBoard = () => {
  const isMountedRef = useRef<boolean>(false);
  const setNotices = appStore(state => state.setNotices);

  const fetchNotices = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notice-board'));

      if (!querySnapshot.empty) {
        const data: NoticeBoardType[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<NoticeBoardType, 'id'>),
        }));

        if (isMountedRef.current) {
          await setNotices(data);
        }
      } else {
        if (isMountedRef.current) {
          await setNotices([]);
          console.error('NoticeBoard fetch failed');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        await setNotices([]);
        console.error('NoticeBoard fetch failed', err);
      }
    }
  }, [setNotices]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchNotices();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchNotices]);
};
