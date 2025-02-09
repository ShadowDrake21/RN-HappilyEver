// import { useUser } from '@clerk/clerk-expo';
// import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useEffect, useState } from 'react';
// import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
// import LoaderKit from 'react-native-loader-kit';
// import { IconButton } from 'react-native-paper';

// import { COLORS } from '~/constants/colors';
// import useSelectProfileImage from '~/hooks/useSelectProfileImage';

// type ProfileSelectImageProps = {
//   bottomSheetRef: React.RefObject<BottomSheetMethods>;
//   toggleBottomSheet: boolean;
//   setToggleBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedProfileImage: string;
//   resetSelectedImage: () => void;
//   buttonsVisibility: boolean;
// };

// const ProfileSelectImage = ({
//   bottomSheetRef,
//   toggleBottomSheet,
//   setToggleBottomSheet,
//   selectedProfileImage,
//   resetSelectedImage,
//   buttonsVisibility,
// }: ProfileSelectImageProps) => {
//   const { user } = useUser();
//   const [selectionLoading, setSelectionLoading] = useState(false);

//   // const { pickedImageFromGallery, saveProfileImage, resetSelectedImage, buttonsVisibility } =
//   //   useSelectProfileImage();

//   const saveProfileImage = () => {
//     return user?.setProfileImage({ file: selectedProfileImage }).then(() => resetSelectedImage());
//   };

//   return (
//     <View style={{ position: 'relative', flex: 1 }}>
//       <View style={{ flexDirection: 'row', gap: 15, alignSelf: 'center' }}>
//         <View className="self-center">
//           <Pressable
//             onPress={() => {
//               if (toggleBottomSheet) {
//                 setToggleBottomSheet(false);
//                 bottomSheetRef.current?.close();
//               } else {
//                 setToggleBottomSheet(true);
//                 bottomSheetRef.current?.expand();
//               }
//             }}>
//             {selectedProfileImage ? (
//               <Image
//                 source={{ uri: selectedProfileImage }}
//                 style={{ width: 200, height: 200, borderRadius: 100 }}
//                 resizeMode="cover"
//               />
//             ) : (
//               <Image
//                 source={{ uri: user?.imageUrl }}
//                 style={{ width: 200, height: 200, borderRadius: 100 }}
//                 resizeMode="cover"
//               />
//             )}
//           </Pressable>
//         </View>
//         {buttonsVisibility && (
//           <View style={{ justifyContent: 'center' }}>
//             <IconButton
//               icon="check"
//               iconColor="green"
//               size={30}
//               onPress={() => {
//                 setSelectionLoading(true);
//                 saveProfileImage();
//                 setSelectionLoading(false);
//               }}
//             />
//             <IconButton icon="close" iconColor="red" size={30} onPress={resetSelectedImage} />
//           </View>
//         )}
//         {selectionLoading && (
//           <View
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <LoaderKit
//               name="BallPulseSync"
//               style={{ width: 80, height: 80 }}
//               color={COLORS.mainPurple}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default ProfileSelectImage;

// const styles = StyleSheet.create({});

import { useUser } from '@clerk/clerk-expo';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { IconButton } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import usePickImageFromGallery from '~/hooks/usePickProfileImageFromGallery';
import useSelectProfileImage from '~/hooks/useSelectProfileImage';

type ProfileSelectImageProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  toggleBottomSheet: boolean;
  setToggleBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProfileImage: string;
  resetSelectedImage: () => void;
  buttonsVisibility: boolean;
};

const ProfileSelectImage = ({
  onImagePress,
  selectedImage,
  reset,
  isSelection,
}: {
  onImagePress: () => void;
  selectedImage: string;
  reset: () => void;
  isSelection: boolean;
}) => {
  const { user } = useUser();
  const [selectionLoading, setSelectionLoading] = useState(false);

  const saveProfileImage = () => {
    return user?.setProfileImage({ file: selectedImage }).then(() => reset());
  };

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 15, alignSelf: 'center' }}>
        <View className="self-center">
          <Pressable onPress={onImagePress}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        {isSelection && (
          <View style={{ justifyContent: 'center' }}>
            <IconButton
              icon="check"
              iconColor="green"
              size={30}
              onPress={() => {
                setSelectionLoading(true);
                saveProfileImage();
                setSelectionLoading(false);
              }}
            />
            <IconButton icon="close" iconColor="red" size={30} onPress={reset} />
          </View>
        )}
        {selectionLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoaderKit
              name="BallPulseSync"
              style={{ width: 80, height: 80 }}
              color={COLORS.mainPurple}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileSelectImage;

const styles = StyleSheet.create({});
