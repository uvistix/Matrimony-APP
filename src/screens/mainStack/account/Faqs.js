import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import theme from "../../../themeProvider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

const FAQPage = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(0); // State to track the currently selected FAQ.

  const faqData = [
    {
      question: "How can I edit or update my profile information?",
      answer:
        "Navigate to your profile page, scroll down to bottom end. You will find Edit Profile button to easily edit and update your personal, educational, professional, family, and Kundli details.",
    },
    {
      question: "How can I get my profile verified on BWB Matrimony?",
      answer:
        "To get your profile verified, ensure that all your information is accurate and up-to-date. Once your profile is complete, our app management will manually review it. If everything aligns, a verified badge will be enabled.",
    },
    {
      question: "What criteria are considered during the verification process?",
      answer:
        "Our app management reviews personal, educational, professional, family, and Kundli details. Ensuring accuracy and completeness of information is crucial for successful verification.",
    },
    {
      question: "What benefits does a verified profile offer?",
      answer:
        "A verified profile adds authenticity and credibility to your account. It assures other users that your information has been manually reviewed by our app management, enhancing trust in your profile.",
    },
    {
      question: "How can I delete my account permanently?",
      answer:
        "To permanently delete your account, visit the profile page and find the 'Update Login / Delete Account' section. Follow the provided instructions to complete the process.",
    },
    {
      question: "How does the subscription renewal process work?",
      answer:
        "Subscriptions are automatically renewed every 30 days from the day of activation. During the trial phase, subscriptions are free. In the future, you'll need to manually activate your subscription.",
    },
    {
      question: "How can I contact BWB Matrimony support for assistance?",
      answer:
        "Reach out to our support team by filling up the contact us form on the support page if you need any assistance or have further questions.",
    },
    {
      question: "How can I report inappropriate or suspicious profiles?",
      answer:
        "We take user safety seriously. Use the contact form on the support page to bring any inappropriate or suspicious profiles to our attention.",
    },
    {
      question: "What happens if I forget my password?",
      answer:
        'No worries! Use the "Forgot Password" feature on the login page, and we will guide you through the process of resetting your password.',
    },
  ];

  const toggleFAQ = (index) => {
    if (selectedFAQ === index) {
      setSelectedFAQ(-1);
    } else {
      setSelectedFAQ(index);
    }
  };

  return (
    <View style={theme.mainContainer}>
      <View style={theme.flexView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={theme.card}>
            <View style={theme.heroblockImageContainer}>
              <Image
                source={require("../../../../assets/faqs.png")}
                style={theme.heroblockImage}
              />
            </View>
            <Text style={theme.title}>FAQ's</Text>
            {faqData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={theme.faqItemContainer}
                onPress={() => toggleFAQ(index)}
              >
                <View style={theme.faqTitleContainer}>
                  <Text
                    style={
                      selectedFAQ === index
                        ? theme.faqTitleActive
                        : theme.faqTitle
                    }
                  >
                    {item.question}
                  </Text>
                  {selectedFAQ === index ? (
                    <Ionicons
                      name="caret-up"
                      size={16}
                      style={theme.faqArrowIconActive}
                    />
                  ) : (
                    <Ionicons
                      name="caret-down"
                      size={16}
                      style={theme.faqArrowIcon}
                    />
                  )}
                </View>
                {selectedFAQ === index && (
                  <Text style={theme.faqDescription}>{item.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FAQPage;
