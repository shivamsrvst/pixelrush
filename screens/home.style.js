import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../constants/index";

const styles=StyleSheet.create({

    textStyle:{
        fontFamily:"bold",
        fontSize:40
    },
    appBarWrapper:{
        marginHorizontal:22,
        marginTop:SIZES.small,    
    },
    appBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    location:{
        fontFamily:"semibold",
        fontSize:SIZES.medium,
        color:COLORS.gray,
    },
    cartCount:{
        position:"absolute",
        bottom:16,
        width:16,
        height:16,
        borderRadius:8,
        alignItems:"center",
        backgroundColor:"green",
        justifyContent:"center",
        zIndex:999
    },
    cartNumber:{
       fontFamily:"regular",
       fontWeight:"600",
       fontSize:10,
       color:COLORS.lightWhite

    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    toastContainer: {
        position: 'absolute', 
        bottom: 100, 
        left: 20, 
        right: 20, 
        padding: 15,
        borderRadius: 10,
        // Make Background Transparent
        backgroundColor: 'transparent', 
      },  

})


export default styles
