/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {ScrollView, StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native'
import {Box} from './Box';
import {Topic} from './Topic';
import {navPush} from '../../components/Nav/Nav';
import Search from '../Search/Search'

export default class Find extends Component {

    constructor(props) {
        super(props);
        this.toSearchKb = this.toSearchKb.bind(this);

    }

    toSearchKb(o) {
        //navPush.push(o, Search, '搜索');
        Alert.alert('你点击了搜索!');
    }

    _navRight(nav, _p) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={() => {_p.toSearchKb(nav)}}>
                <Image source={require('../Home/img/search.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }


    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f5f5f5'}}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {/*<Box navigator={this.props.navigator} />*/}
                    <Topic navigator={this.props.navigator} />
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center',
    },
})