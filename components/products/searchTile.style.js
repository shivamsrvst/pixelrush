import { StyleSheet } from "react-native";
import { COLORS,SIZES,SHADOWS } from "../../constants";


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:SIZES.small,
        flexDirection:"row",
        padding:SIZES.medium,
        backgroundColor:"#FFF",
        ...SHADOWS.medium,
        shadowColor:COLORS.lightWhite,
        borderRadius:SIZES.large,
        marginHorizontal:12
    },
    image:{
        width:75,
        backgroundColor:COLORS.lightWhite,
        justifyContent:"center",
        alignContent:"center"
    },
    productImg:{
        width:"100%",
        height:65,
        borderRadius:SIZES.small,
        resizeMode:"cover",
    },
    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium

    },
    productTitle:{
        fontSize:SIZES.medium,
        fontFamily:"bold",
        color:COLORS.primary

    },
    supplier:{
        fontSize:SIZES.small +2,
        fontFamily:"regular",
        color:COLORS.gray,
        marginTop:-5
    },
    price:{
        fontSize:SIZES.small +2,
        fontFamily:"semibold",
        color:COLORS.gray,
        marginTop:3

    }

})

export default styles;