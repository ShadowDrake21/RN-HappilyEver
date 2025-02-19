import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';

const ChatHeaderActions = () => {
  return (
    <View className="flex-row gap-5">
      <Pressable>
        <Ionicons name="call-outline" size={24} color={COLORS.grayish} />
      </Pressable>
      <Pressable>
        <Ionicons name="videocam-outline" size={24} color={COLORS.grayish} />
      </Pressable>
      <Pressable>
        <Ionicons name="settings-outline" size={24} color={COLORS.grayish} />
      </Pressable>
    </View>
  );
};

export default ChatHeaderActions;
