import {appStore} from '@/appStore/appStore';
import type {
  SmallAboutCardType,
  SmallAboutCardimageType,
} from '@/types/homeTypes';
import {useGenericFetchTextAndImage} from '../shared/genericFetchHook';

// Fixed document IDs
const TEXT_DOC_ID = 'gy7JOSioCyirk8KNeSmX';
const IMAGE_DOC_ID = 'TthcdPKX2bYBHqNuHarF';

export const useFetchSmallAboutCard = () => {
  const setSmallAboutCard = appStore(state => state.setSmallAboutCard);
  const setSmallAboutCardImage = appStore(
    state => state.setSmallAboutCardImage,
  );

  useGenericFetchTextAndImage<SmallAboutCardType, SmallAboutCardimageType>(
    'smallAboutCard',
    TEXT_DOC_ID,
    IMAGE_DOC_ID,
    setSmallAboutCard,
    setSmallAboutCardImage,
    'SmallAboutCard',
  );
};
