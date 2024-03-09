import { StyleSheet } from "react-native"
import { COLORS,SIZES,SHADOWS } from "../../constants"
const styles=StyleSheet.create({
    couponSectionContainer: {
        marginTop: 10,
      },
      couponSection: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        },     
        couponInput: {
          borderColor: COLORS.primary,
          borderWidth: 1,
          borderRadius: SIZES.small,
          padding: SIZES.small,
          flex: 1,
        },
        applyButton: {
          marginLeft: 10,
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.small,
          paddingVertical: SIZES.small,
          paddingHorizontal: SIZES.medium,
        },
        applyButtonText: {
          color: COLORS.white,
          fontFamily: "regular",
        },
        disabledButton:{
          backgroundColor: COLORS.gray2,
        },
        invalidCouponText:{
          color:COLORS.red,
          fontWeight:'500',
          fontSize:14,
        }
        

    })

    
export default styles