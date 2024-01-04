import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants";

const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.42; // Adjust the percentage as needed
const imageWidth = cardWidth - SIZES.small;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: height * 0.3, // Adjust the percentage as needed
    marginEnd: width * 0.05, // Adjust the percentage as needed
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: imageWidth,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop:-5
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;
