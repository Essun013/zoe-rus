/**
 * Created by linys on 2016/11/2.
 */
import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView} from 'react-native';
import device from '../../../common/util/device';


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'hello!'
        };
    }

    render() {
        return <View style={styles.container}>
            <Text>{this.state.message}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: device.width(),
        backgroundColor:'#fff',
    },


});

module.exports = Message;