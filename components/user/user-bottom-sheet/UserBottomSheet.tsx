import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserBottomSheetContainer from './UserBottomSheetContainer';
import UserBottomSheetContent from './UserBottomSheetContent';

import { IUserFullProfile } from '~/types/user.types';

const UserBottomSheet = ({ user }: { user: IUserFullProfile | undefined }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <UserBottomSheetContainer>
      {user && (
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: bottom + 50, gap: 15 }}
          style={{
            padding: 20,
          }}>
          <UserBottomSheetContent user={user} />
        </BottomSheetScrollView>
      )}
    </UserBottomSheetContainer>
  );
};

export default UserBottomSheet;
