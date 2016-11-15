/**
 * Created by ianchen on 2016/11/15.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

class CheckedDetail extends Component {
    render() {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
            <Text style={{fontSize: 25, color: 'grey'}}>{this.props.text}</Text>
        </View>
    }
}

module.exports = CheckedDetail;