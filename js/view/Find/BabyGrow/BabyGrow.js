/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ScrollTabBar from '../ScrollTabBar/ScrollTabBar'
import Content from './Content/Content'
import {hideMenu} from '../../../actions/actions';

class BabyGrow extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.dispatch(hideMenu(true));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <ScrollTabBar/>
                <Content/>
            </ScrollView>
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