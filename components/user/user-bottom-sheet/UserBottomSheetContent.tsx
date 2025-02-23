import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import UserBasicInfo from '../UserBasicInfo';
import UserIdealMatch from '../UserIdealMatch';
import UserInterests from '../UserInterests';
import UserPhotos from '../UserPhotos';
import UserQuestions from '../UserQuestions';

import { unknownFlag } from '~/constants/links';
import useFetchCountries from '~/hooks/fetching/useFetchCountries';
import { IUserFullProfile } from '~/types/user.types';

const UserBottomSheetContent = ({ user }: { user: IUserFullProfile | undefined }) => {
  const { width } = useWindowDimensions();
  const { data: userCountry, isLoading } = useFetchCountries({
    url: user ? `https://restcountries.com/v3.1/alpha/${user.countryId.toLowerCase()}` : '',
    config: { params: { fields: 'name,flags,idd,cca2' } },
    enabled: !!user,
    queryKey: ['country'],
  });
  const isUserActive = true;

  if (!user) return null;

  return (
    <>
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
      <UserInterests userName={user.profileBasicForm.fullName} interestsIds={user.interests} />
      <UserIdealMatch userName={user.profileBasicForm.fullName} idealMatchId={user.idealMatch} />
    </>
  );
};

export default UserBottomSheetContent;

const styles = StyleSheet.create({});
