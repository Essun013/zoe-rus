/**
 * Created by linys on 2016/11/28.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';


class WeightSacle extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('---WeightSacle---componentDidMount------');
    }
    componentWillMount() {
        console.log('---WeightSacle---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---WeightSacle---componentWillUnmount------');
    }

    render(){
        console.log('---WeightSacle---render------');

        return (
            <View style={styles.container}>
                <Text>体重计</Text>
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

module.exports = WeightSacle;