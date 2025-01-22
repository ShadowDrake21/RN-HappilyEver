import { Link } from 'expo-router';
import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type MainButtonProps = {
  href: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const MainButtonLink = ({
  href,
  style,
  disabled,
  children,
}: MainButtonProps & PropsWithChildren) => {
  return (
    <Link href={href as any} asChild>
      <Button
        mode="contained"
        buttonColor={COLORS.accent3}
        style={[{ borderRadius: 25 }, style]}
        contentStyle={{ paddingVertical: 5 }}
        disabled={disabled}>
        {children}
      </Button>
    </Link>
  );
};

export default MainButtonLink;
