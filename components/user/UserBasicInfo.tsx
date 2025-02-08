import ActivityBadge from '@components/shared/ActivityBadge';
import MediumTitle from '@components/ui/MediumTitle';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { IMainSettingsBasicForm } from '~/types/main-settings.types';
import { getFullYears } from '~/utils/helpers.utils';

type UserBasicInfoProps = {
  profileBasicForm: IMainSettingsBasicForm;
  country: { countryId: string; countryName: string; countryFlagImg: string };
  isUserActive: boolean;
};

const UserBasicInfo = ({
  profileBasicForm,
  country: { countryName, countryFlagImg, countryId },
  isUserActive,
}: UserBasicInfoProps) => {
  return (
    <View className="gap-3">
      <View style={styles.topContainer}>
        <MediumTitle style={{ textAlign: 'left', paddingBottom: 0 }}>
          {profileBasicForm.fullName}, {getFullYears(profileBasicForm.birthDate)}
        </MediumTitle>

        <View>
          <ActivityBadge isUserActive={isUserActive} />
        </View>
      </View>
      <PaperText variant="titleLarge" style={styles.text}>
        @{profileBasicForm.username}
      </PaperText>

      <PaperText variant="titleMedium" style={styles.text}>
        {profileBasicForm.gender}, {profileBasicForm.occupation}
      </PaperText>

      <View className="flex-row items-center gap-2">
        <PaperText variant="titleSmall" style={styles.text}>
          From
        </PaperText>

        <Image source={{ uri: countryFlagImg }} style={{ width: 100, height: 75 }} />

        <PaperText variant="titleSmall" style={styles.text}>
          {countryName ?? countryId}
        </PaperText>
      </View>
    </View>
  );
};

export default UserBasicInfo;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: { color: COLORS.text, fontWeight: '600' },
});
