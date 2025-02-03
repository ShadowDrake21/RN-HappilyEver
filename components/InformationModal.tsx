import ParagraphText from '@components/ui/ParagraphText';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Modal,
  PaperProvider,
  Portal,
  Text as PaperText,
  Button,
  Icon,
  MD3Colors,
  IconButton,
} from 'react-native-paper';

import HeaderActionButton from './main-settings/HeaderActionButton';

import { COLORS } from '~/constants/colors';
import { useMatchesModalContext } from '~/context/MatchesModalContext';

const InformationModal = () => {
  const { isVisible, setIsVisible } = useMatchesModalContext();

  const router = useRouter();
  const hideModal = () => setIsVisible(false);

  const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20 };
  return (
    <Modal
      visible={isVisible}
      onDismiss={hideModal}
      style={{
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 15,
      }}
      contentContainerStyle={containerStyle}
      dismissableBackButton={false}>
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0 }}
        icon={() => <Icon source="close" color={MD3Colors.error50} size={32} />}
        onPress={() => hideModal()}
      />
      <View className="gap-5 py-5">
        <PaperText variant="headlineSmall" style={{ fontWeight: '700' }}>
          Your Journey to Lasting Love
        </PaperText>
        <ParagraphText style={{ color: 'black' }}>
          You’ve reached 1/4 of your available matches. Don’t worry—there are plenty more to
          explore!
        </ParagraphText>
        <ParagraphText style={{ color: 'black' }}>
          Our non-profit app is created by believers in love and marriage to help you find
          meaningful connections.{' '}
          <ParagraphText style={{ color: 'black', fontWeight: '700' }}>
            We encourage you to meet people in real life, as it’s the best way to build lasting
            relationships. But we also understand everyone’s path is different, so we created this
            app to promote dating, marriage, and love for all.
          </ParagraphText>
        </ParagraphText>

        <ParagraphText style={{ color: 'black' }}>
          This app is free, but you can upgrade to premium for unlimited matches. You can also
          support our projects—like this app, our Warsaw-based dating school, or pro-dating
          campaigns—through donations.
        </ParagraphText>
        <ParagraphText style={{ color: 'black' }}>
          We’re grateful for your support and excited to help you find your forever match.{' '}
          <ParagraphText style={{ color: 'black', fontWeight: '700' }}>
            Ready to continue your journey? Let’s make it happen!
          </ParagraphText>
        </ParagraphText>
      </View>
      <View className="flex-row gap-5">
        <Button
          mode="elevated"
          buttonColor={COLORS.mainPurple}
          textColor="white"
          style={{ flex: 1 }}
          onPress={() => router.navigate('./premium')}>
          Buy Premium
        </Button>
        <Button
          mode="elevated"
          buttonColor={COLORS.lightDark}
          textColor="white"
          style={{ flex: 1 }}
          onPress={() => router.navigate('/donate')}>
          Donate us
        </Button>
      </View>
    </Modal>
  );
};

export default InformationModal;

const styles = StyleSheet.create({});
