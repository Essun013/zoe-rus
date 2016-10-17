/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import ScrollTabBar from '../ScrollTabBar/ScrollTabBar'
import Content from './Content/Content'
import {home, find} from '../../../actions';

class BabyGrow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(home.hideMenu(true));
    }

    componentWillMount() {
        this.props.dispatch(find.navShare(this.navBarRightBottom()));
    }

    componentWillUnmount() {
        this.props.dispatch(home.hideMenu(false));
        this.props.dispatch(find.navShare(null));
    }

    navBarRightBottom() {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter}>
                <Image source={require('../img/share.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View>
                <View>
                    <ScrollTabBar/>
                </View>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} style={{marginTop: -14}}>
                    <Content/>
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center'
    }
})

const {connect} = require('react-redux');

module.exports = connect()(BabyGrow);