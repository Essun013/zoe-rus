/**
 * Created by linys on 2016/10/26.
 */

import React, {Component} from 'react';
import {StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {find} from '../../../actions';
import {navPush} from '../../../components/Nav/Nav';
import {connect} from 'react-redux';

class Fetalmove extends Component {

    // 默认属性
    static defaultProps = {}

    // 属性类型
    static propTypes = {}

    constructor(props) {
        console.log('---Expectant---0.constructor------');
        super(props);


    }

    componentDidMount() {
    }


    _navRight(nav, _prototype) {
        return (
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter}>
                    <Text style={{color:'rgb(255,255,255)',fontSize:15}}>添加</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentWillUnmount() {
    }


    render(){
        console.log('---Fetalmove---2.render------');

        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>

            </View>
        );

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

});

module.exports = Fetalmove;
