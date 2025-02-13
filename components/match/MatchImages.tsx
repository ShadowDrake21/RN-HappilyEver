import { Image, View } from 'react-native';

type MatchImagesProps = {
  firstUrl: string;
  secondUrl: string;
};

const MatchImages = ({ firstUrl, secondUrl }: MatchImagesProps) => {
  return (
    <View className="relative flex flex-row justify-center">
      <Image source={{ uri: firstUrl }} className="aspect-square flex-1 rounded-full" />
      <Image source={{ uri: secondUrl }} className="aspect-square flex-1 rounded-full" />
      <Image
        source={require('assets/icons/love.png')}
        className="absolute -bottom-10 h-[100] w-[100]"
      />
      <Image
        source={require('assets/icons/wedding-ring.png')}
        className="absolute -top-10 h-[100] w-[100]"
      />
    </View>
  );
};

export default MatchImages;
