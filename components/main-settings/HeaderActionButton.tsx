import { IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const HeaderActionButton = ({
  tintColor,
  onPress,
  icon = 'arrow-left',
}: {
  tintColor: string | undefined;
  onPress: () => void;
  icon?: IconSource;
}) => <IconButton icon={icon} iconColor={tintColor} size={20} onPress={onPress} />;

export default HeaderActionButton;
