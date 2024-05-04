import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import theme from "../../../themeProvider/ThemeProvider";

const AboutCompany = () => {
  return (
    <View style={theme.mainContainer}>
      <View style={theme.flexView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={theme.card}>
            <View style={theme.heroblockImageContainer}>
              <Image
                source={require("../../../../assets/bwbm-logo-color.png")}
                style={theme.heroblockImage}
              />
            </View>
            <Text style={theme.title}>About Us - </Text>
            <Text style={theme.title}>BWB Matrimony</Text>
            <View style={theme.paragraph}>
              <Text style={theme.pPText}>
                Welcome to BWB Matrimony, where meaningful connections blossom
                into lifelong partnerships. We are more than just a matrimonial
                app; we are your trusted companion in the journey to find love,
                companionship, and lasting happiness.
              </Text>
            </View>
            <View style={theme.paragraph}>
              <Text style={theme.pPTitle}>Our Mission:</Text>
              <Text style={theme.pPText}>
                At BWB Matrimony, our mission is simple yet profound - to bring
                together hearts that resonate with each other. We understand the
                significance of finding the right life partner, and we are
                dedicated to providing a platform that fosters genuine
                connections.
              </Text>
            </View>
            <View style={theme.paragraph}>
              <Text style={theme.pPTitle}>Why Choose BWB Matrimony?</Text>
            </View>

            <Text style={theme.pPText}>
              <Text style={theme.pPTitle}>Tailored for You: </Text>Our platform
              goes beyond the ordinary, allowing you to create a profile that
              reflects your unique personality, preferences, and aspirations.
            </Text>
            <Text style={theme.pPText}>
              <Text style={theme.pPTitle}>Discover Connections:</Text> With a
              rich tapestry of profiles, we empower you to explore and connect
              with individuals who share your values, dreams, and outlook on
              life.
            </Text>
            <Text style={theme.pPText}>
              <Text style={theme.pPTitle}>Privacy and Security:</Text> Your
              trust is paramount. Rest assured, our robust security measures and
              privacy protocols ensure that your journey with BWB Matrimony is
              not just meaningful but also secure.
            </Text>
            <View style={theme.paragraph}>
              <Text style={theme.pPTitle}>Subscription Model:</Text>
              <Text style={theme.pPText}>
                While we believe in the power of love, we also understand the
                need for sustainability. Our subscription model, currently in
                its trial phase, is designed to provide you with enhanced
                features, ensuring your experience is seamless and tailored to
                your needs.
              </Text>
            </View>
            <View style={theme.paragraph}>
              <Text style={theme.pPTitle}>Our Commitment:</Text>
              <Text style={theme.pPText}>
                BWB Matrimony is committed to fostering a community built on
                respect, integrity, and authenticity. We actively discourage any
                unethical practices, ensuring that your interactions on our
                platform are genuine and heartfelt.
              </Text>
            </View>
            <View style={theme.paragraph}>
              <Text style={theme.pPTitle}>Get Started:</Text>
              <Text style={theme.pPText}>
                Embark on your journey with BWB Matrimony today. Whether you're
                ready to find your perfect match or just curious to explore the
                possibilities, we're here to make your experience memorable and
                rewarding.
              </Text>
            </View>
            <Text style={theme.pPText}>
              Thank you for choosing BWB Matrimony. Together, let's create
              stories of love that last a lifetime.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutCompany;
