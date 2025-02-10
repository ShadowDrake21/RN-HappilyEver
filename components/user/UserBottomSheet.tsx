import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserBasicInfo from './UserBasicInfo';
import UserIdealMatch from './UserIdealMatch';
import UserInterests from './UserInterests';
import UserPhotos from './UserPhotos';
import UserQuestions from './UserQuestions';

import { COLORS } from '~/constants/colors';
import { unknownFlag } from '~/constants/links';
import useFetchCountries from '~/hooks/useFetchCountries';
import { IUserFullProfile } from '~/types/user.types';

const UserBottomSheet = ({ user }: { user: IUserFullProfile | undefined }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isUserActive = true;

  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const { data: userCountry, isLoading } = useFetchCountries({
    url: user ? `https://restcountries.com/v3.1/alpha/${user.countryId.toLowerCase()}` : '',
    config: { params: { fields: 'name,flags,idd,cca2' } },
    enabled: !!user,
    queryKey: ['country'],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, zIndex: 20, position: 'relative' }}>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.close()}
        snapPoints={['20%', '80%']}
        backgroundStyle={{ backgroundColor: COLORS.extraDark, borderRadius: 25 }}
        containerStyle={[styles.container, { marginTop: top }]}
        index={0}>
        {user && (
          <BottomSheetScrollView
            contentContainerStyle={{ flex: 1, paddingBottom: bottom, gap: 15 }}
            style={styles.contentContainer}>
            <UserBasicInfo
              profileBasicForm={user.profileBasicForm}
              country={{
                countryFlagImg: userCountry?.[0].flags?.png || unknownFlag,
                countryId: user.countryId,
                countryName: userCountry?.[0].name.common || user.countryId,
              }}
              isUserActive={isUserActive}
            />
            <UserQuestions rawQuestions={user.profileExtendedForm} />
            <UserPhotos photos={user.photos} width={width} />
            <UserInterests
              userName={user.profileBasicForm.fullName}
              interestsIds={user.interests}
            />
            <UserIdealMatch
              userName={user.profileBasicForm.fullName}
              idealMatchId={user.idealMatch}
            />
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default UserBottomSheet;

const styles = StyleSheet.create({
  container: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  contentContainer: {
    padding: 20,
  },
});
