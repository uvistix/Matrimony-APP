import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import theme from "../../themeProvider/ThemeProvider";

const WalkthroughScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const navigation = useNavigation();

  

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );

  const _renderItem = ({ item, dimensions }) => {
    if (item === slides[slides.length - 1]) {
      // If it's the last slide, render buttons instead of the content.
      return (
        <>
          <View style={[theme.oBContainer, dimensions]}>
            <Image
              style={theme.oBImage}
              source={item.image}
              size={100}
              color="white"
            />
            <View>
              <Text style={theme.oBTitle}>{item.title}</Text>
              <Text style={theme.oBText}>{item.text}</Text>
            </View>
            <View style={theme.oBButtonContainer}>
              <TouchableOpacity
                style={theme.oBPrimaryButton}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={theme.oBPrimaryButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.oBSecondaryButton}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={theme.oBSecondaryButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <View style={[theme.oBContainer, dimensions]}>
          <Image
            style={
              item.title === "Welcome to BWB Matrimony"
                ? theme.oBImageLogo
                : theme.oBImage
            }
            source={item.image}
            size={100}
            color="white"
          />
          <View>
            <Text style={theme.oBTitle}>{item.title}</Text>
            <Text style={theme.oBText}>{item.text}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      showSkipButton={true}
      showDoneButton={false}
      showNextButton={true}
    />
  );
};

WalkthroughScreen.propTypes = {
  apptheme: PropTypes.object,
  appConfig: PropTypes.object,
};

export default WalkthroughScreen;
