import React, { useRef, useEffect } from "react";
import { Animated, Easing, Modal, View, Image} from "react-native";
import PropTypes from "prop-types";
import theme from "../themeProvider/ThemeProvider";

const RotatingImageAnim = React.memo(({ source, duration }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.timing(rotateValue, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const repeatAnimation = Animated.loop(rotateAnimation);

    repeatAnimation.start();

    return () => {
      repeatAnimation.stop();
    };
  }, [duration]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Image
      source={source}
      style={[theme.splashAnim, { transform: [{ rotate }] }]}
    />
  );
}, (prevProps, nextProps) => prevProps.source === nextProps.source && prevProps.duration === nextProps.duration);

const SplashScreen = ({ visible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInOutAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    );

    fadeInOutAnimation.start();

    return () => {
      fadeInOutAnimation.stop();
    };
  }, [fadeAnim]);

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={theme.splashContainer}>
        <View>
          {(
            <Image
              style={theme.splashImage}
              source={require("../../assets/splash-logo.png")}
              color="white"
            />
          )}
          <RotatingImageAnim
            source={require("../../assets/splash-animator.png")}
            duration={3000}
          />
        </View>
        <View>
          <Animated.Text
            style={{ ...theme.splashLoadingText, opacity: fadeAnim }}
          >
            Loading...
          </Animated.Text>
        </View>
      </View>
    </Modal>
  );
};

SplashScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default SplashScreen;
