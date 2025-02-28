import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MatchActions from './MatchActions';
import MatchImages from './MatchImages';
import MatchText from './MatchText';

const Match = ({
  firstUrl,
  secondUrl,
  chatId,
}: {
  firstUrl: string;
  secondUrl: string;
  chatId: number | undefined;
}) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: 100 + top,
        paddingBottom: bottom,
      }}
      className="max-w-full flex-1 justify-between px-5">
      <MatchImages firstUrl={firstUrl} secondUrl={secondUrl} />
      <MatchText />
      <MatchActions chatId={chatId} />
    </View>
  );
};

export default Match;
