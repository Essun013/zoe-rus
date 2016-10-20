/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../../common/util/device';

class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {initPage : 7, week : 8, date: 1};
    }

    render() {
        return (
            <View style={styles.title}>
                <Text style={styles.titlelocalText}>产检医院  思明区妇幼保健院</Text>
                <View style={styles.titlelocal}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Image source={require('../../img/locate.png')} style={styles.localImg}></Image>
                        <Text style={styles.titleGoThere}>到这里去</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }



}

const styles = StyleSheet.create({
    title : {
        width: device.width(),
        height: 44,
        backgroundColor: '#f5f5f5',
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlelocalText : {
        flex:5,
        color:'rgb(146,146,146)',
        fontSize: 13,
        paddingTop: 6,
        paddingBottom: 6,
        //backgroundColor: 'blue',
        textAlign: 'right',
        fontFamily: 'PingFang SC',
    },
    titlelocal : {
        paddingTop: 11,
        paddingBottom: 11,
        flex: 2,
    },
    localImg : {
        marginLeft:10,
        width:15,
        height:20,
        //backgroundColor: 'blue',
    },
    titleGoThere : {
        marginLeft:10,
        fontSize: 13,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
    }

});

module.exports = Top;