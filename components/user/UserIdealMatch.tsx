import SmallParagraphText from '@components/ui/SmallParagraphText';
import SmallSectionTitle from '@components/ui/SmallSectionTitle';
import Subtitle from '@components/ui/Subtitle';
import React from 'react';
import { Image, View } from 'react-native';

import { COLORS } from '~/constants/colors';
import { profileIdealMatchIcons } from '~/content/profile-ideal-match.content';
import useUserIdealMatch from '~/hooks/user/useUserIdealMatch';
import { IdealMatch } from '~/types/shared.types';

const UserIdealMatch = ({
  userName,
  idealMatchId,
}: {
  userName: string;
  idealMatchId: IdealMatch;
}) => {
  const { idealMatch } = useUserIdealMatch(idealMatchId);

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
