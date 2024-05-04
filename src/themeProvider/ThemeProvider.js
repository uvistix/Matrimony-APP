import { StyleSheet } from "react-native";

const LIGHT = {
  PRIMARY_COLOR: "#6F155C",
  SECONDARY_COLOR: "#ffffff",
  BACKGROUND_COLOR: "#EBEBEB",
  BLACK_PRIMARY_COLOR: "#191919",
  BLACK_SECONDARY_COLOR: "#8F8F8F",
  INPUT_BORDER_COLOR: "#D6D6D6",
  SHADOW_COLOR: "#000",
};

const theme = StyleSheet.create({
  // commonStyles
  primaryColor: LIGHT.PRIMARY_COLOR,
  secondaryColor: LIGHT.SECONDARY_COLOR,
  blackSecondaryColor: LIGHT.BLACK_SECONDARY_COLOR,
  iconPrimarySize: 24,
  statusbarColor: LIGHT.PRIMARY_COLOR,
  inputPlaceholderColor: LIGHT.BLACK_SECONDARY_COLOR,

  backgroundColor: {
    backgroundColor: LIGHT.BACKGROUND_COLOR,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: LIGHT.BACKGROUND_COLOR,
  },
  contentArea: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: LIGHT.PRIMARY_COLOR,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: "bold",
    color: LIGHT.BLACK_PRIMARY_COLOR,
  },
  text: {
    color: LIGHT.BLACK_PRIMARY_COLOR,
    lineHeight: 24,
  },
  secondaryText: {
    fontSize: 14,
    color: LIGHT.BLACK_SECONDARY_COLOR,
  },

  primaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT.PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: LIGHT.SECONDARY_COLOR,
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 16,
  },
  primaryButtonIcon: {
    flexDirection: "row",
    backgroundColor: LIGHT.PRIMARY_COLOR,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 8,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderWidth: 1,
  },
  primaryButtonIconText: {
    color: LIGHT.SECONDARY_COLOR,
    fontSize: 16,
    paddingRight: 8,
  },
  secondaryButtonIcon: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 8,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderWidth: 1,
  },
  secondaryButtonIconText: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 16,
    paddingRight: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: LIGHT.INPUT_BORDER_COLOR,
    padding: 10,
    marginVertical: 5,
  },

  inputPasswordContainer: {
    position: "relative",
  },
  passwordEyeIcon: {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: [{ translateY: -10 }],
  },
  dropDownIcon: {
    color: LIGHT.BLACK_SECONDARY_COLOR,
  },
  dropDownContainer: {
    marginVertical: 5,
  },
  dropDownInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: LIGHT.INPUT_BORDER_COLOR,
    padding: 10,
    marginVertical: 5,
  },

  card: {
    backgroundColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 16,
    margin: 10,
    shadowColor: LIGHT.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  flexView: {
    flex: 1,
  },
  link: {
    color: LIGHT.PRIMARY_COLOR,
    textAlign: "right",
  },
  iconPrimaryColor: {
    color: LIGHT.PRIMARY_COLOR,
  },
  iconSecondaryColor: {
    color: LIGHT.SECONDARY_COLOR,
  },
  iconDisabledColor: {
    color: LIGHT.BLACK_SECONDARY_COLOR,
  },

  //splashScreenStyles;
  splashContainer: {
    backgroundColor: LIGHT.PRIMARY_COLOR,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  splashImage: {
    width: 200,
    height: 145,
    tintColor: LIGHT.SECONDARY_COLOR,
    position: "relative"
  },

  splashAnim: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: "absolute",
    bottom: 0,
    left: 88,
    right: 0,
    top: 75,
  },
  splashLoadingText: {
    color: LIGHT.SECONDARY_COLOR,
    marginVertical: 10,
    fontSize: 16,
  },

  //onboardingStyles
  oBTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 25,
    color: LIGHT.SECONDARY_COLOR,
  },
  oBText: {
    fontSize: 18,
    textAlign: "center",
    color: LIGHT.SECONDARY_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 27,
  },
  oBImageLogo: {
    width: 170,
    height: 120,
    marginBottom: 60,
    tintColor: LIGHT.SECONDARY_COLOR,
  },
  oBImage: {
    width: 120,
    height: 120,
    marginBottom: 60,
    tintColor: LIGHT.SECONDARY_COLOR,
  },
  oBContainer: {
    flex: 1,
    paddingTop: "50%",
    alignItems: "center",
    backgroundColor: LIGHT.PRIMARY_COLOR,
  },
  oBButtonContainer: {
    marginTop: 25,
    width: "90%",
    alignItems: "center",
  },
  oBPrimaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT.SECONDARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  oBPrimaryButtonText: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 16,
  },
  oBSecondaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  oBSecondaryButtonText: {
    color: LIGHT.SECONDARY_COLOR,
    fontSize: 16,
  },

  // authCommonStyles
  authContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: LIGHT.PRIMARY_COLOR,
  },
  authWelcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: LIGHT.SECONDARY_COLOR,
    marginVertical: 10,
    textAlign: "center",
  },
  authSubText: {
    fontSize: 20,
    color: LIGHT.SECONDARY_COLOR,
    marginBottom: 30,
    textAlign: "center",
  },
  authCTA: {
    marginTop: 30,
    textAlign: "center",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },

  //bottomNavStyles;
  tabBarStyle: {
    backgroundColor: LIGHT.SECONDARY_COLOR,
    borderColor: LIGHT.SECONDARY_COLOR,
    borderTopWidth: 1,
    paddingBottom: 6,
    paddingTop: 8,
    height: 58,
  },

  //headerStyles
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: LIGHT.PRIMARY_COLOR,
    borderTopWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
  },

  headerIconContainer: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: LIGHT.SECONDARY_COLOR,
  },

  //homeStyles;
  profileCard: {
    backgroundColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    shadowColor: LIGHT.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  homeProfileCardDetailsContainer: {
    position: "relative",
  },
  homeVerifiedBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  homeProfileIdContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  homeProfileVerifiedContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  homeProfileId: {
    color: LIGHT.SECONDARY_COLOR,
    backgroundColor: LIGHT.PRIMARY_COLOR,
    padding: 5,
    borderRadius: 5,
  },
  homeProfileBottomDetails: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  homeProfileColumn: {
    flex: 1,
    minWidth: 0,
  },
  homeProfileDetailsStyles: {
    fontWeight: "bold",
    fontSize: 18,
    color: LIGHT.SECONDARY_COLOR,
  },

  //profileContentButton;
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: LIGHT.BACKGROUND_COLOR,
    borderTopWidth: 1,
    borderColor: LIGHT.INPUT_BORDER_COLOR,
  },

  //profileContentInfo;

  profileInfoImage: {
    width: "auto",
    height: 350,
    borderRadius: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: LIGHT.BACKGROUND_COLOR,
  },
  textContainer: {
    alignItems: "center",
  },
  profileInfoContainer: {
    marginTop: 10,
  },
  profileInfoFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  profileInfoFieldHeadline: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  profileInfoFieldTitle: {
    textAlign: "left",
    color: LIGHT.BLACK_PRIMARY_COLOR,
    flex: 1,
  },
  profileInfoFieldValue: {
    textAlign: "left",
    flex: 1,
    color: LIGHT.BLACK_PRIMARY_COLOR,
  },

  //Request & Saved Styles;
  requestsProfile: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: LIGHT.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  requestsProfileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  requestsProfileTitle: {
    fontWeight: "bold",
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 18,
    marginVertical: 5,
  },

  requestPrimaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT.PRIMARY_COLOR,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 3,
  },
  requestPrimaryButtonText: {
    color: LIGHT.SECONDARY_COLOR,
    fontSize: 16,
  },
  requestSecondaryButton: {
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 3,
  },
  requestSecondaryButtonText: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 16,
  },
  requestImage: {
    width: 125,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LIGHT.BACKGROUND_COLOR,
  },

  //noDataStyles
  noRequestsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noRequestsText: {
    fontSize: 20,
    color: LIGHT.BLACK_SECONDARY_COLOR,
  },

  //accountStyles;
  accountImage: {
    width: 125,
    height: 125,
    borderRadius: 75,
    marginTop: 15,
    borderWidth: 2,
    borderColor: LIGHT.BACKGROUND_COLOR,
  },
  accountProfileContainer: {
    marginTop: 15, 
    alignItems: "center", 
    borderTopWidth: 1, 
    borderColor: LIGHT.BLACK_SECONDARY_COLOR,
  },
  accountProfileName: {
    fontSize: 28,
    fontWeight: "bold",
    // marginVertical: 10,
    color: LIGHT.PRIMARY_COLOR,
    textAlign: "center",
  },
  accountIcon: {
    marginRight: 16,
    color: LIGHT.PRIMARY_COLOR,
  },
  accountMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: LIGHT.BLACK_SECONDARY_COLOR,
  },
  accountMenuText: {
    flex: 1,
    color: LIGHT.BLACK_PRIMARY_COLOR,
  },
  accountArrowIcon: {
    marginLeft: "auto",
    marginRight: 10,
    color: LIGHT.PRIMARY_COLOR,
  },
  accountSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  signOutContainer: {
    alignItems: "center",
    margin: 10,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    width: "50%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButtonText: {
    color: LIGHT.PRIMARY_COLOR,
    fontSize: 16,
  },

  //imagePickerStyles;
  ipVerifiedBadge: {
    position: "absolute",
    bottom: 0,
    left: -15,
    right: 0,
    top: 0,
  },

  //accountSubPageStyles;
  heroblockImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroblockImage: {
    width: 250,
    height: 250,
  },

  //aboutUs;

  paragraph: {
    marginVertical: 10,
  },

  //faqStyles;

  faqContainer: {
    marginBottom: 50,
  },

  faqItemContainer: {
    marginVertical: 5,
    width: "100%",
    backgroundColor: LIGHT.SECONDARY_COLOR,
    shadowColor: LIGHT.SHADOW_COLOR,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  faqTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  faqTitle: {
    flex: 1,
    fontWeight: "bold",
    padding: 10,
    color: LIGHT.BLACK_PRIMARY_COLOR,
  },
  faqTitleActive: {
    flex: 1,
    fontWeight: "bold",
    padding: 10,
    color: LIGHT.PRIMARY_COLOR,
  },
  faqArrowIconActive: {
    color: LIGHT.PRIMARY_COLOR,
    marginRight: 10,
  },
  faqArrowIcon: {
    color: LIGHT.BLACK_PRIMARY_COLOR,
    marginRight: 10,
  },
  faqDescription: {
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    color: LIGHT.BLACK_PRIMARY_COLOR,
  },

  //privayPolicy & termsCondition styles
  pPText: {
    color: LIGHT.BLACK_PRIMARY_COLOR,
    paddingVertical: 5,
    lineHeight: 24,
  },
  pPTitle: {
    color: LIGHT.BLACK_PRIMARY_COLOR,
    fontWeight: "bold",
  },

  // sortingButtonStyles;
  sortingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sortingButton: {
    borderRadius: 8,
    alignItems: "center",
  },
  sortingActiveButton: {
    backgroundColor: LIGHT.PRIMARY_COLOR,
  },
  sortingIcon: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortingIconText: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 10,
  },

  //filterStyles;

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT.SECONDARY_COLOR,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginVertical: 10,
    backgroundColor: LIGHT.BACKGROUND_COLOR,
  },
  filterTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  filterSearchBar: {
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    flex: 1,
  },
  filterSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LIGHT.SECONDARY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    backgroundColor: LIGHT.SECONDARY_COLOR,
    shadowColor: LIGHT.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  filterBox: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -12 }],
    paddingHorizontal: 10,
  },

  filterModalContainer: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: LIGHT.SECONDARY_COLOR,
    color: LIGHT.PRIMARY_COLOR,
  },
  filterModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  //pagination
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  pageNumber: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: LIGHT.PRIMARY_COLOR,
    borderRadius: 5,
  },
});

export default theme;
