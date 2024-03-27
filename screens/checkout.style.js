import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardDelivery: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 10,
    paddingBottom: 2,
  },
  cardTitleDelivery: {
    fontSize: SIZES.medium + 2,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.primary,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: SIZES.medium + 2,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  selectedPayment: {
    backgroundColor: COLORS.secondary,
  },
  paymentButtonContainer: {
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  paymentButtonText: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium + 2,
    fontWeight: "bold",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  totalAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  totalAmountLabel: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginRight: 10,
    color: COLORS.black,
  },
  totalAmount: {
    fontSize: SIZES.medium + 4,
    fontWeight: "bold",
    color: COLORS.black,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.primary, // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff", // Background color of the card
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Elevation for Android shadow
    shadowColor: "#000", // Shadow color for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color:COLORS.white
  },
  itemLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999, // Ensure it's above other components
},
});

export default styles;
