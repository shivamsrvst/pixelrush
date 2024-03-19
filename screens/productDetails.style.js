import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../constants";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightWhite
    },

    upperRow:{
        marginHorizontal:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        position:"absolute",
        top:SIZES.xxLarge,
        width:SIZES.width-44,
        zIndex:999,
    },
    image:{
        aspectRatio:1,
        resizeMode:"cover",
    },
    details:{
        marginTop:-SIZES.large,
        backgroundColor:COLORS.lightWhite,
        width:SIZES.width,
        borderTopLeftRadius:SIZES.medium,
        borderTopRightRadius:SIZES.medium,
    },
    titleRow:{
        marginHorizontal:20,
        paddingBottom:SIZES.small,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:SIZES.width-44,
        top:20
    },
    ratingRow:{
        paddingBottom:SIZES.small,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:SIZES.width-10,
        top:5
    },

    cartRow:{
        paddingBottom:SIZES.small,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:SIZES.width,
    },

    cartBtn:{
        width:SIZES.width*0.4,
        backgroundColor:COLORS.black,
        padding:SIZES.small/2,
        borderRadius:SIZES.large,
        marginLeft:12
    },
    addCart:{
        width:67,
        height:37,
        borderRadius:50,
        margin:SIZES.small,
        backgroundColor:COLORS.black,
        alignItems:"center",
        justifyContent:"center"

    },

    title:{
        fontFamily:"bold",
        fontSize:SIZES.large
    },
    price:{
        paddingHorizontal:10,
        fontFamily:"semibold",
        fontSize:SIZES.large
    },
    priceWrapper:{
        // alignItems:"center",
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.large
    },
    rating:{
        top:SIZES.large,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginHorizontal:SIZES.large,
    },
    ratingText:{
        color:COLORS.gray,
        fontFamily:"medium",
        paddingHorizontal:3,
        marginHorizontal:5
    },
    
    descriptionWrapper:{
        marginTop:SIZES.large*2,
        marginHorizontal:SIZES.large,
    },
    description:{
        fontFamily:"medium",
        fontSize:SIZES.large-2
    },
    descText:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        textAlign:"justify",
        marginBottom:SIZES.small
    },
    location:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:COLORS.secondary,
        padding:5,
        borderRadius:SIZES.large,
        marginHorizontal:12

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


})
export default styles