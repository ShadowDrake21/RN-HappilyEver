import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import { useMainSettings } from '~/context/MainSettingsContext';
import { useUserStorage } from '~/store/store';
import {
  getProfileSettingsFilledOut,
  setProfile,
  setProfileIdealMatch,
  setProfileInterests,
  setProfilePhoto,
  setProfileQuestions,
  setUserCountryId,
  updateProfileContentFilledOut,
} from '~/supabase/supabase-typed.requests';
import { callAlert, callToast } from '~/utils/ui.utils';

// TODO: Make better instant data validation

const useMainSettingsOperations = () => {
  const { state } = useMainSettings();
  const { getToken, userId } = useAuth();
  const { setIsNewUser } = useUserStorage();
  const router = useRouter();

  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;

  const fetchMainSettingsAvalability = async () => {
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      console.log('Fetching main settings availability');
      const rawResult = await getProfileSettingsFilledOut(token, userId);
      const result = (rawResult as unknown as { isFilledOut: boolean }[])[0].isFilledOut;
      // console.log('result', result);
      // setIsNewUser(!result);

      if (!result) {
        router.replace('/main-settings/select-country');
      }
    }
  };

  const saveMainSettings = async () => {
    const token = await getToken({ template: 'supabase' });

    if (token && userId && email) {
      try {
        await setUserCountryId(token, userId, state.countryId);
        await setProfile(token, userId, {
          ...state.profileBasicForm!,
          email,
        });

        if (state.profileExtendedForm) {
          await setProfileQuestions(token, userId, state.profileExtendedForm);
        }

        for (const photo of state.photos) {
          await setProfilePhoto(token, userId, photo);
        }

        await setProfileInterests(token, userId, state.interests);

        if (state.idealMatch) {
          await setProfileIdealMatch(token, userId, state.idealMatch.id);
        }

        await updateProfileContentFilledOut(token, userId, true);
        callToast({ text1: 'Congratulations!', text2: 'Your profile is ready!' });
        router.replace('/home');
      } catch (error) {
        console.log('Error saving main settings', error);
        const [title, message] = (error as { message: string }).message.split(
          ': '
        ) as unknown as string;
        callAlert({ title, message: message.charAt(0).toUpperCase() + message.slice(1) });
      }

      setIsNewUser(true);
    } else {
      console.log('Missing token, userId, or email');
    }
  };

  return { saveMainSettings, fetchMainSettingsAvalability };
};

export default useMainSettingsOperations;
