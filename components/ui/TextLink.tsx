import { Href, Link } from 'expo-router';
import React, { PropsWithChildren } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { COLORS } from '~/constants/colors';

const TextLink = ({
  href,
  classes,
  children,
}: { href: Href; classes?: string } & { children: PropsWithChildren<string> }) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity className={classes}>
        <Text style={{ color: COLORS.accent2 }} className="font-poppins-medium">
          {children}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TextLink;
