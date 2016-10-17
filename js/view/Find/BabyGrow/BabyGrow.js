/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
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
        this.props.dispatch(find.navShare(this.navBarRightBottom));
    }

    componentWillUnmount() {
        this.props.dispatch(home.hideMenu(false));
    }

    navBarRightBottom(route, navigator, index, navState) {
        if (index > 0) {
            return <View style={styles.rightContainer}>
                <Text>123</Text>
            </View>
        }
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
    }
})

const {connect} = require('react-redux');

module.exports = connect()(BabyGrow);