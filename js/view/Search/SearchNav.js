/**
 * Created by ianchen on 16/11/2.
 */

import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Navigator,
    } from 'react-native';
import Search from './Search';
import Nav from '../../components/Nav/Nav';

class SearchNav extends Component {

    render() {
        return <Navigator
            style={styles.container}
            navigationBarHidden={true}
            initialRoute={{
                title: '搜索',
                component: Search,
            }}/>
         /*<Nav route={{component: Search, title: '搜索'}} barStyle={{backgroundColor: '#ff5884'}}/>*/
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'blue',
    }

});

module.exports = SearchNav;