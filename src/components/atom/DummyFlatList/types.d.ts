import {
  FlatListProps,
  ListRenderItem,
  // NativeScrollEvent,
  // NativeSyntheticEvent,
} from "react-native";

// @ts-ignore
interface DummyFlatListProps extends FlatListProps<any> {
  // onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  // scrollEventThrottle?: number;
  data?: any[];
  renderItem?: ListRenderItem<any>;
}
