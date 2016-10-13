/**
 * Created by sea35 on 2016/10/11.
 */
import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity,Image ,View} from 'react-native';



const ImgButton = (props) => {
    const { text, onClick } = props

    return (
        <TouchableOpacity onPress={onClick}>
        <Image  style={styles.button} source={require('./img/but-png.png')} resizeMode='stretch'>
            <Text style={styles.text}>{text}</Text>
        </Image>
            </TouchableOpacity>
    )
}

ImgButton.PropTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({

    button: {
        height: 35,
        width:350,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text :{
        fontSize:18,
        color:'#ffffff',
        backgroundColor:'#fe7aa2'
    }
});

export default ImgButton