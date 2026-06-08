import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const LikeAnimation = ({liked = false}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (liked) {
      scale.value = withSpring(1.4);
      opacity.value = withTiming(1);
    } else {
      scale.value = withSpring(1);
      opacity.value = withTiming(0.8);
    }
  }, [liked, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.icon}>
        {liked ? '❤️' : '🤍'}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default LikeAnimation;