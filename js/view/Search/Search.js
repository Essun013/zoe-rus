/**
 * Created by linys on 2016/11/1.
 */
import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView} from 'react-native';
import device from '../../common/util/device';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord:'hello!'
        };
    }

    render() {
        return <View style={styles.container}>
           <Text>{this.state.searchWord}</Text>
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

module.exports = Search;