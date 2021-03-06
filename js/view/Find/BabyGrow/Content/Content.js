/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../../common/util/device';

class Content extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            initPage : 7,
            week : 8,
            date: 1,
            testHtml: "",
        };
        this.getDetail = this.getDetail.bind(this);
    }

    componentWillMount(){
        console.log('------componentWillMount------');
        this.setState({
            testHtml: this.props
        });
    }

    componentWillReceiveProps(){
        //父组件更新时候，触发
        console.log('------componentWillReceiveProps------');
    }

    getDetail(){
        console.log("点击了明细！");
    }


    render() {
        return (<View style={styles.container}>
            <View>
                <TouchableOpacity style={[styles.listItem,{marginTop: -1}]} onPress={this.getDetail}>
                    <View style={styles.weekContent}>
                        <Image source={require('../../img/babygrow_cal_sel.png')} style={styles.weekSelImg}>
                            <Text style={styles.bgWeekText}>{this.state.week}周</Text>
                        </Image>
                    </View>
                    <View style={styles.babyContent}>
                        <Image source={require('../../img/babygrow_01.png')} style={styles.babyImg}/>
                        <Text style={styles.contentText}>
                            {this.state.testHtml}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
         </View>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        width: device.width(),
        height: device.height()
    },
    weekSelImg: {
        width: 68,
        height: 68,
    },
    weekunSelImg: {
        width: 68,
        height: 68,
    },
    babyImg: {
        //marginLeft: 20,
        width: 124,
        height: 180,
    },
    weekContent: {
        width: device.width()/4,
        paddingLeft:15
    },
    babyContent: {
        width: device.width()/4*3,
        paddingRight:15
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        //paddingLeft: 15,
        paddingTop: 12,
        marginTop: 1,
        //width: device.width(),
        backgroundColor: '#fff',
    },
    bgWeekText: {
        color: '#fff',
        fontSize: 22,
        paddingLeft:17,
        paddingTop:15,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    bgDateText: {
        color: '#fff',
        fontSize: 14,
        paddingLeft:18,
        paddingTop:-3,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    dateText: {
        color: 'rgb(146,146,146)',
        paddingTop:5,
        paddingLeft:4,
        marginBottom:15,
    },
    contentText: {
        //marginLeft: 15,
        color: 'rgb(146,146,146)',
        paddingTop:12,
        marginBottom:20
    }

});

module.exports = Content;