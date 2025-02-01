import { IconButton } from 'react-native-paper';

const HeaderLeftButton = ({
  tintColor,
  onPress,
}: {
  tintColor: string | undefined;
  onPress: () => void;
}) => <IconButton icon="arrow-left" iconColor={tintColor} size={20} onPress={onPress} />;

export default HeaderLeftButton;
