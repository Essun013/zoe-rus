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


class WeightSacle extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.animatedValue = new Animated.Value(0);
        this.springValue = new Animated.Value(0.3);

        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);


    }

    componentDidMount() {
        console.log('---WeightSacle---componentDidMount------');
        //console.log(_.trim("   sss  "));
        this.spin();
        this.animate1();
        this.animate();

    }
    componentWillMount() {
        console.log('---WeightSacle---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---WeightSacle---componentWillUnmount------');
    }

    animate () {
        this.animatedValue1.setValue(0);
        this.animatedValue2.setValue(0);
        this.animatedValue3.setValue(0);
        const createAnimation = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay
                }
            )
        };
        Animated.parallel([
            createAnimation(this.animatedValue1, 2000, Easing.ease),
            createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
            createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
        ]).start();
    }

    spring () {
        this.springValue.setValue(0.3);
        Animated.spring(
            this.springValue,{
                toValue: 1,
                friction: 0.7
            }
        ).start(()=>this.spring());
    }

    animate1() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear
            }
        ).start(() => this.animate1());
    }

    spin(){
        this.spinValue.setValue(0);
        let result = Animated.timing(
            this.spinValue,{
                toValue: 1,
                duration: 5000,
                easing: Easing.linear
            }
        ).start(()=>this.spin());
        console.log('spin...');
    }



    render(){
        console.log('---WeightSacle---render------');

        const spin1 = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '0deg']
        });
        const spin2 = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        });

        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, device.width() - 40]
        });
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });
        const movingMargin = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, device.width() - 40, 0]
        });
        const textSize = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [18, 32, 18]
        });
        const rotateX = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        });

        const scaleText = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 2]
        })
        const spinText = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '720deg']
        })
        const introButton = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 400]
        })

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Animated.View
                        style={{ transform: [{scale: scaleText}] }}>
                        <Text>Welcome</Text>
                    </Animated.View>
                    <Animated.View
                        style={{ marginTop: 20, transform: [{rotate: spinText}] }}>
                        <Text
                            style={{fontSize: 20}}>
                            to the App!
                        </Text>
                    </Animated.View>
                    <Animated.View
                        style={{top: introButton, position: 'absolute'}}>
                        <TouchableHighlight
                            onPress={this.animate.bind(this)}
                            style={{backgroundColor:'blue'}}>
                            <Text
                                style={{color: 'white', fontSize: 20}}>
                                Click Here To Start
                            </Text>
                        </TouchableHighlight>
                    </Animated.View>


                    <Text
                        style={{marginBottom: 10}}
                        onPress={this.spring.bind(this)}>Spring</Text>
                    <Animated.Image
                        style={{ width: 100, height: 100, transform: [{scale: this.springValue}] }}
                        source={require('../img/nbnc.png')} />
                    
                    
                    <Animated.View
                        style={{
                            marginLeft: marginLeft,
                            height: 30,
                            width: 40,
                            backgroundColor: 'red'}} />
                    <Animated.View
                        style={{
                            marginTop: movingMargin,
                            marginLeft: movingMargin,
                            height: 30,
                            width: 40,
                            backgroundColor: 'orange'}} />
                    <Animated.Image
                        style={{
                            width: 100,
                            height: 100,
                            transform: [{rotate: spin1}] }}
                        source={require('../img/tzj.png')}
                        resizeMode='stretch'
                    />

                    <Animated.Image
                        resizeMode='stretch'
                        style={{
                            width: 100,
                            height: 100,
                            transform: [{rotate: spin2}] }}
                        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
                    />

                    {/*<TouchableOpacity onPress={()=>this.spin()}>
                        <Image  style={{width:127, height: 100}} source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}} />
                    </TouchableOpacity>*/}


                    <Animated.View
                        style={{
                            opacity,
                            marginTop: 10,
                            height: 30,
                            width: 40,
                            backgroundColor: 'blue'}} />
                    <Animated.Text
                        style={{
                            fontSize: textSize,
                            marginTop: 10,
                            color: 'green'}} >
                        Fuck car!老司机开车！
                    </Animated.Text>
                    <Animated.View
                        style={{
                            transform: [{rotateX}],
                            marginTop: 30,
                            height: 30,
                            width: 40,
                            backgroundColor: 'black'}}>
                        <Text style={{color: 'white'}}>Hello from TransformX</Text>
                    </Animated.View>
                </ScrollView>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(245,245,245)',
        alignItems:'center',
        //justifyContent:'center',
    },

});

module.exports = WeightSacle;