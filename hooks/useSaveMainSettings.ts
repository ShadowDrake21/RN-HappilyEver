import { useAuth, useUser } from '@clerk/clerk-expo';

import { useMainSettings } from '~/context/MainSettingsContext';
import {
  setProfile,
  setProfileIdealMatch,
  setProfileInterests,
  setProfilePhoto,
  setProfileQuestions,
  setUserCountryId,
} from '~/supabase/supabaseQueries';

const useSaveMainSettings = () => {
  const { state } = useMainSettings();
  const { getToken, userId } = useAuth();
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;

  const saveMainSettings = async () => {
    console.log('saveMainSettings called');
    const token = await getToken({ template: 'supabase' });

    if (token && userId && email) {
      console.log('Saving main settings');
      await setUserCountryId(token, userId, state.countryId);
      await setProfile(token, userId, {
        ...state.profileBasicForm!,
        email,
      });

      console.log('state.profileExtendedForm exists:', !!state.profileExtendedForm);
      if (state.profileExtendedForm) {
        await setProfileQuestions(token, userId, state.profileExtendedForm);
      }

      for (const photo of state.photos) {
        console.log('Saving photo:', photo);
        await setProfilePhoto(token, userId, photo);
      }

      console.log('Saving interests:', state.interests);
      await setProfileInterests(token, userId, state.interests);

      if (state.idealMatch) {
        console.log('Saving ideal match:', state.idealMatch.id);
        await setProfileIdealMatch(token, userId, state.idealMatch.id);
      }
    } else {
      console.log('Missing token, userId, or email');
    }
  };

  return { saveMainSettings };
};

export default useSaveMainSettings;
