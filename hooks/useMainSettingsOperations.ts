import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import { useMainSettings } from '~/context/MainSettingsContext';
import { useUserStorage } from '~/store/store';
import {
  getProfileById,
  getProfileSettingsFilledOut,
  getUserCountryId,
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
// USE MORE REACT QUERY
const useMainSettingsOperations = () => {
  const router = useRouter();

  const { state } = useMainSettings();
  const { getToken, userId } = useAuth();
  const {
    setIsNewUser,
    setUserBirthday,
    setUserGender,
    setUserCountryId: setUserCountry,
    setUserGenderLoading,
  } = useUserStorage();

  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;

  const fetchMainSettingsAvalability = async () => {
    setUserGenderLoading(true);
    const token = await getToken({ template: 'supabase' });

    if (token && userId) {
      const rawUserData = await getProfileById(token, userId);
      const rawUserLocation = await getUserCountryId(token, userId);

      if (rawUserData.length === 0) {
        router.replace('/main-settings/select-country');
        return;
      }

      const formattedUserData = (
        rawUserData as unknown as {
          birthDate: string;
          gender: string;
          isFilledOut: boolean;
        }[]
      )[0];
      const formatterUserLocation = (rawUserLocation as unknown as { country_id: string }[])[0];

      if (!formattedUserData.isFilledOut) {
        router.replace('/main-settings/select-country');
      } else {
        console.log('User data is filled out', formattedUserData.gender);
        setUserBirthday(formattedUserData.birthDate);
        setUserGender(formattedUserData.gender as 'male' | 'female');
        setUserCountry(formatterUserLocation.country_id);
      }
      setUserGenderLoading(false);
    } else {
      console.error('Missing token or userId');
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

        const nameParts = state.profileBasicForm?.fullName.split(' ');
        user.update({ firstName: nameParts?.[0], lastName: nameParts?.slice(1).join(' ') });
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
      setUserGender(state.profileBasicForm!.gender as 'male' | 'female');
      setUserCountry(state.countryId);
      setUserBirthday(state.profileBasicForm!.birthDate?.toDateString()!);
    } else {
      console.log('Missing token, userId, or email');
    }
  };

  return { saveMainSettings, fetchMainSettingsAvalability };
};

export default useMainSettingsOperations;
