/**
 * Created by linys on 2016/11/24.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';


class Eatorno extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {

        };

        //导航栏


    }

    componentDidMount() {
        console.log('---Eatorno---componentDidMount------');
    }
    componentWillMount() {
        console.log('---Eatorno---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---Eatorno---componentWillUnmount------');
    }


    render(){
        console.log('---Eatorno---render------');

        return (
            <View style={styles.container}>
                <Text>能不能吃</Text>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(245,245,245)',
    },

});

module.exports = Eatorno;