import { View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const MatchText = () => {
  return (
    <View className="gap-5">
      <PaperText
        variant="displayLarge"
        style={{
          fontFamily: 'PlayfairDisplay-Italic',
          fontWeight: '700',
          color: COLORS.mainPurple,
          textAlign: 'center',
        }}>
        It's a Match
      </PaperText>
      <PaperText
        variant="titleMedium"
        style={{
          fontFamily: 'PlayfairDisplay-Regular',
          color: COLORS.text,
          textAlign: 'center',
        }}>
        Every great love story starts with a single hello. Why not make yours today?
      </PaperText>
    </View>
  );
};

export default MatchText;
