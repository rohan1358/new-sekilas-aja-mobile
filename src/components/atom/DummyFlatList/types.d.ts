import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

interface DummyFlatListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle?: number;
}
