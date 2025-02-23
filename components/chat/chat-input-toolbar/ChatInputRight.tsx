import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { COLORS } from '~/constants/colors';

const ChatInputRight = () => {
  return (
    <View className="flex-row gap-3">
      <Pressable>
        <Feather name="paperclip" size={20} color={COLORS.grayish} />
      </Pressable>
      <Pressable>
        <Ionicons name="camera-outline" size={20} color={COLORS.grayish} />
      </Pressable>
    </View>
  );
};

export default ChatInputRight;
