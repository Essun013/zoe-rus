/**
 * Created by linys on 2016/11/28.
 */
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    Image,
    Easing,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';


const arr = []
for (var i = 0; i < 999; i++) {
    arr.push(i)
}

var tmp;

class WeightSacle extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.animatedValue = [];
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0)
        });

    }

    componentDidMount() {
        console.log('---WeightSacle---componentDidMount------');
        tmp = setTimeout(()=>this.animate(), 3000);
    }
    componentWillMount() {
        console.log('---WeightSacle---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---WeightSacle---componentWillUnmount------');
        tmp?clearTimeout(tmp):null;
    }

    animate () {
        const animations = arr.map((item) => {
            return Animated.timing(
                this.animatedValue[item],{
                    toValue: 1,
                    duration: 500
                }
            )
        });

        Animated.sequence(animations).start();

    }




    render(){
        console.log('---WeightSacle---render------');

        const animations = arr.map((a, i) => {
            return <Animated.View key={i} style={{opacity: this.animatedValue[a], height: 30, width: 30,
                        backgroundColor: 'red', marginLeft: 2, marginTop: 2}} />
        });


        return (
            <View style={[styles.container, {flex: 1}]}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    {animations}
                </ScrollView>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(245,245,245)',
        //alignItems:'center',
        //justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

});

module.exports = WeightSacle;