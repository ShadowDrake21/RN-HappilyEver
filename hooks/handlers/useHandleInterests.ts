import { useMainSettings } from '~/context/MainSettingsContext';
import { ProfileInterestsIds } from '~/types/main-settings.types';
import { addInterest, removeInterest } from '~/utils/helpers.utils';

const useHandleInterests = () => {
  const { state, dispatch } = useMainSettings();

  const handleToggleInterest = (newInterest: ProfileInterestsIds) => {
    const prev = state.interests;
    let updatedInterests: ProfileInterestsIds[] = [];

    const index = prev.findIndex((item) => item.categoryId === newInterest.categoryId);

    if (index === -1) {
      updatedInterests = [...prev, newInterest];
    } else {
      if (prev[index].interestIds.includes(newInterest.interestIds[0])) {
        updatedInterests = removeInterest(prev, newInterest);
      } else {
        updatedInterests = addInterest(prev, newInterest);
      }
    }

    dispatch({ type: 'SET_INTERESTS', payload: updatedInterests });
  };

  return { handleToggleInterest };
};

export default useHandleInterests;
