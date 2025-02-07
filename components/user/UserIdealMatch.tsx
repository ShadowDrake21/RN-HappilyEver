import SmallParagraphText from '@components/ui/SmallParagraphText';
import SmallSectionTitle from '@components/ui/SmallSectionTitle';
import Subtitle from '@components/ui/Subtitle';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { profileIdealMatch, profileIdealMatchIcons } from '~/content/profile-ideal-match.content';
import { ProfileIdealMatch } from '~/types/main-settings.types';
import { IdealMatch } from '~/types/shared.types';

const UserIdealMatch = ({
  userName,
  idealMatchId,
}: {
  userName: string;
  idealMatchId: IdealMatch;
}) => {
  const [idealMatch, setIdealMatch] = useState<ProfileIdealMatch | undefined>(undefined);

  useEffect(() => {
    setIdealMatch(retrieveIdealMatch());
  }, [idealMatchId]);

  const retrieveIdealMatch = () => {
    return profileIdealMatch.find((item) => item.id === idealMatchId);
  };

  return (
    idealMatch && (
      <View>
        <SmallSectionTitle style={{ paddingBottom: 0 }}>
          What {userName.split(' ')[0]} looks for in a relationship:
        </SmallSectionTitle>
        <View
          className="flex-1 items-center justify-between gap-2 rounded-3xl border border-transparent p-4"
          style={[{ backgroundColor: COLORS.extraDark }]}>
          <Image
            source={profileIdealMatchIcons[idealMatch.id as keyof typeof profileIdealMatchIcons]}
            className="h-[100px] w-[100px]"
          />
          <Subtitle style={{ paddingBottom: 0 }}>{idealMatch.title}</Subtitle>
          <SmallParagraphText style={{ textAlign: 'center' }}>
            {idealMatch.description}
          </SmallParagraphText>
        </View>
      </View>
    )
  );
};

export default UserIdealMatch;

const styles = StyleSheet.create({});
