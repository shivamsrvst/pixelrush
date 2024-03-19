import { StyleSheet } from "react-native"
import {COLORS,SIZES,SHADOWS} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  favContainer: (color) => ({
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: color,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  }),
  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.xSmall,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  priceQuantity: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginRight: 5,
  },

  deleteButton: {
    paddingBottom: 20,
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  totalText: {
    fontWeight: "bold",
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

toastContainer: {
    position: 'absolute', 
    bottom: 150, 
    left: 20, 
    right: 20, 
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'transparent', 
  },  

  swipeActions:{
    justifyContent:'center',
    alignItems:'center',
    width:100
  },
  quantityCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.xSmall,
    padding:4,
    backgroundColor:COLORS.secondary,
    // marginBottom:46
  },
  quantityCount: {
    marginHorizontal: SIZES.small / 2, // Add some space between icons and the count
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },



});


export default styles

