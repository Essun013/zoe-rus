/**
 * Created by linys on 16/10/20.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import PregnancyCheckedImage from './PregnancyCheckedImage';

class PregnancyCheckDetail extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={{marginTop:10,marginLeft:10}}>
                        <Text style={styles.titleText}>
                            产检时间
                        </Text>
                        <Text style={styles.titleTextContent}>
                            怀孕12周
                        </Text>
                    </View>
                    <View style={{marginTop:10,marginLeft:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.titleText]}>
                                产检项目
                            </Text>
                            <View style={{flex: 1, alignSelf: 'flex-end'}}>
                                <PregnancyCheckedImage />
                            </View>
                        </View>
                        <Text style={styles.titleTextContent}>
                            建档。
                        </Text>
                        <Text style={styles.titleTextContentDetail}>
                            建立母子健康档案意味着各次产检都会在这家医院进行，宝宝也会在这里出生。一般来说建档主要为了确定孕周、推算预产期、评估妊娠风险等。
                        </Text>
                        <Text style={styles.titleTextContent}>
                            NT检查。
                        </Text>
                        <Text style={styles.titleTextContentDetail}>
                            即通过B超检查胎儿是否健康。孕12周左右宝宝脖子后面会有一层透明带，染色体正常的宝宝透明带厚度小于2.5毫米，所以NT检查又叫胎儿颈后透明带检查。
                        </Text>
                        <Text style={styles.titleTextContent}>
                            手检。
                        </Text>
                        <Text style={styles.titleTextContentDetail}>
                            医生会对准妈妈的甲状腺、乳房、骨盆、子宫大小进行检查，以判断宝宝生长的“环境”是否健康，评估准妈妈的妊娠风险。
                        </Text>
                    </View>
                    <View style={{marginTop:10,marginLeft:10}}>
                        <Text style={styles.titleText}>
                            产检大数据
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>羊水指数范围(cm) ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>—</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>羊水量正常值(ml) ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>—</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>胎盘成熟度：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>胎盘0级</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>孕酮值(nmol/L) ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>76.4±23.7</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>HCG值(mIU/ml) ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>7,650-229,000</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>宫高 ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>—</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>腹围 ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>—</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>体重增长 ：</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleTextContentDetail}>—</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    titleText: {
        fontSize: 15,
        color:'rgb(254,122,162)',
        fontFamily: 'PingFang SC',
        marginBottom: 8,
    },
    titleTextContent: {
        paddingLeft:4,
        fontSize: 15,
        color:'rgb(0,0,0)',
        fontFamily: 'PingFang SC',
        //backgroundColor:'blue',
        marginBottom: 8,
    },
    titleTextContentDetail: {
        paddingLeft:6,
        paddingRight:6,
        fontSize: 14,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
        marginBottom: 8,
    }



})

module.exports = PregnancyCheckDetail;