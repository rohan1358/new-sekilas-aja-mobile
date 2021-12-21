import React, { forwardRef, useImperativeHandle } from 'react';
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { heightPercent } from '../../../helpers';
import styles from './styles';

const HEIGHT = heightPercent(100);

const AnimatedOverlay = forwardRef<any, AnimatedOverlayProps>(
  ({ onTap }, ref) => {
    const position = useSharedValue(HEIGHT);

    const containerStyle = useAnimatedStyle(() => ({ top: position.value }));

    const onHandlerStateChange = (
      event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
    ) => {
      if (event.nativeEvent.state !== State.BEGAN) {
        return;
      }
      position.value = withTiming(HEIGHT);
      onTap && onTap();
    };

    useImperativeHandle(ref, () => ({
      open: () => (position.value = withTiming(0)),
      close: () => (position.value = withTiming(HEIGHT))
    }));

    return (
      <TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.container, containerStyle]} />
      </TapGestureHandler>
    );
  }
);

export default AnimatedOverlay;
