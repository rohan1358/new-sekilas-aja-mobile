import Animated from "react-native-reanimated";

interface ExploreSesarchProps {
  cameraPress(): void;
  closePress(): void;

  keyword: string | undefined;

  onChangeText(text: string): void;

  position: Animated.SharedValue<number>;

  ref: any;
}
