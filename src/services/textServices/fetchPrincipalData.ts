import {appStore} from '@/appStore/appStore';
import {SmallAboutCardType, SmallAboutCardimageType} from '@/types/homeTypes';
import {useGenericFetchTextAndImage} from '../shared/genericFetchHook';

// Fixed document IDs for principal
const PRINCIPAL_TEXT_DOC_ID = 'principal_text';
const PRINCIPAL_IMAGE_DOC_ID = 'principal_image';

export const useFetchPrincipalData = () => {
  const setPrincipalText = appStore(state => state.setPrincipalText);
  const setPrincipalImage = appStore(state => state.setPrincipalImage);

  useGenericFetchTextAndImage<SmallAboutCardType, SmallAboutCardimageType>(
    'smallAboutCard',
    PRINCIPAL_TEXT_DOC_ID,
    PRINCIPAL_IMAGE_DOC_ID,
    setPrincipalText,
    setPrincipalImage,
    'Principal',
  );
};
