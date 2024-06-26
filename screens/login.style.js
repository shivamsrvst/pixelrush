import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../constants";

const styles=StyleSheet.create({
    cover:{
        height:SIZES.height/2.8,
        width:SIZES.width-60,
        resizeMode:"contain",
        marginBottom:SIZES.xxLarge
    },
    title:{
        fontFamily:"bold",
        fontSize:SIZES.xLarge,
        color:COLORS.primary,
        alignItems:"center",
        alignContent:"center",
        marginLeft:12,
        marginBottom:SIZES.xxLarge
    },
    wrapper:{
        marginBottom:15,
        // marginHorizontal:20
    },
    label:{
        fontFamily:"regular",
        fontSize:SIZES.xSmall,
        marginBottom:5,
        marginEnd:5,
        textAlign:"right"
    },
    inputWrapper:(borderColor)=>({
        borderColor:borderColor,
        backgroundColor:COLORS.lightWhite,
        borderWidth:1,
        height:50,
        borderRadius:12,
        flexDirection:"row",
        paddingHorizontal:15,
        alignItems:"center"
    }),
    iconStyle:{
        marginRight:10

    },
    errorMessage:{
        color:COLORS.red,
        fontFamily:"regular",
        marginTop:5,
        marginLeft:5,
        fontSize:SIZES.xSmall
    },
    registration:{
        marginTop:6,
        textAlign:"center"
    },
    forgotpassword:{
        marginLeft:4,
        fontSize:SIZES.medium-3,
        fontWeight:"bold"
    }

});

export default styles;