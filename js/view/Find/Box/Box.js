/**
 * Created by linys on 16/10/10.
 */

import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ListView} from 'react-native';
import device from '../../../common/util/device';
import {find} from '../../../actions';
import {navPush} from '../../../components/Nav/Nav';
import Expectant from '../../Box/Expectant/Expectant';


class Box extends Component {
    constructor(props) {
        super(props);
        this.toExpectantPackage = this.toExpectantPackage.bind(this);
    }

    toExpectantPackage() {
        navPush.push(this.props, Expectant, '待产包');
    }

    componentWillMount() {
        console.log('---Box---1.componentWillMount------');
        //this.props.dispatch(find.navText(this.navBarRightBottom()));
    }

    componentWillUnmount() {
        //this.props.dispatch(find.navText(null));
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>百宝箱</Text>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} scrollEnabled={false}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter} onPress={this.toExpectantPackage}>
                            <Image source={require('../img/box/dcb.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>待产包</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/std.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>数胎动</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/tzj.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>体重计</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/nbnc.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>能不能吃</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} scrollEnabled={false}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/bbfs.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>宝宝辅食</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/qmz.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>取名字</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box/myjh.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>免疫计划</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonTextCenter}>
                            <Image source={require('../img/box.png')} style={styles.buttonImgSize}/>
                            <Text style={[styles.titleText]}>添加...</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        width: device.width()
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff'
    },
    titleText: {
        fontFamily: 'PingFang SC',
        lineHeight: 20
    },
    titleBotton: {
        position: 'absolute',
        right: 15
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff'
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15,
        width: device.width() / 4,
    },
    buttonImgSize: {
        width: 46,
        height: 46,
        marginBottom: 14
    },
    buttonTextCenter: {
        alignItems: 'center'
    },

});

module.exports = Box;