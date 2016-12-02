/**
 * Created by ianchen on 2016/11/15.
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Picker,
  Alert
} from 'react-native';
import {navPush} from '../../../components/Nav/Nav';
import device from '../../../common/util/device';
import Expectant from '../../Box/Expectant/Expectant';
import CheckedDetail from './CheckedDetail';

class Checked extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.title}>
        <View>
          <Text style={[styles.titleText]}>{this.props.week + '周+' + this.props.days + '天'}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{marginTop: 8, marginBottom: -8}}>
          <Image source={require('../img/zouqiyu.png')} resizeMode='stretch'
                 style={{width: device.width() - 30, height: 3}}/>
          <Image source={require('../img/zhouqi.png')} resizeMode='stretch'
                 style={{width: 16, height: 16, position: 'relative', top: -10, left: 1}}/>
        </View>
        <TouchableOpacity style={[styles.dashed, styles.clockView]} activeOpacity={1} onPress={() => {
          navPush.push(this.props, CheckedDetail, '产检', {text: '产检'})
        }}>
          <View style={[{borderBottomWidth: 1, borderColor: '#ffc4d6'}, styles.flexRow]}>
            <Image source={require('../img/naozhong.png')} style={styles.imgIcon} resizeMode='stretch'/>
            <View>
              <Text style={styles.text} numberOfLines={1}>距离下次产检 <Text style={{color: '#fe7aa2'}}>11-26</Text> 还有 <Text
                style={{color: '#fe7aa2'}}>19</Text> 天</Text>
            </View>
          </View>
          <View style={{}}>
            <View>
              <Text style={[{marginLeft: 30}, styles.text]} numberOfLines={1}>产检重点：建档、NT检查、空腹</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.dashed, styles.tipsView]}>
          <View style={[{borderBottomWidth: 1, borderColor: '#c4f1ff'}, styles.flexRow]}>
            <Image source={require('../img/xiaoxi.png')} style={styles.imgIcon} resizeMode='stretch'/>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              navPush.push(this.props, CheckedDetail, '分娩医院', {text: '分娩医院'})
            }}>
              <Text style={styles.text} numberOfLines={1}>最好于11-21前计划女好<Text
                style={{color: '#00b8cc'}}>分娩医院</Text></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexRow}>
            <Image source={require('../img/xiaoxi.png')} style={styles.imgIcon} resizeMode='stretch'/>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              navPush.push(this.props, CheckedDetail, '办理生育证明', {text: '办理生育证明'})
            }}>
              <Text style={styles.text} numberOfLines={1}>最好于11-21前<Text style={{color: '#00b8cc'}}>办理生育证明</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.dashed, styles.tipsTool]} activeOpacity={0.6} onPress={() => {
            navPush.push(this.props, CheckedDetail, '饮水提醒', {text: '饮水提醒'})
          }}>
            <View style={styles.tipsToolView}>
              <Image source={require('../img/yinshuitixing.png')} style={styles.tipsToolImg} resizeMode='stretch'/>
              <Text style={styles.tipsToolImgText}>饮水提醒</Text>
            </View>
            <Text style={styles.tipsToolText}>8:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dashed, styles.tipsTool, {marginLeft: 14, marginRight: 14}]}
                            activeOpacity={0.6} onPress={() => {
            navPush.push(this.props, CheckedDetail, '运动提醒', {text: '运动提醒'})
          }}>
            <View style={styles.tipsToolView}>
              <Image source={require('../img/yundongtixing.png')} style={styles.tipsToolImg} resizeMode='stretch'/>
              <Text style={styles.tipsToolImgText}>运动提醒</Text>
            </View>
            <Text style={styles.tipsToolText}>9:50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dashed, styles.tipsTool]} activeOpacity={0.6} onPress={() => {
            navPush.push(this.props, CheckedDetail, '用餐提醒', {text: '用餐提醒'})
          }}>
            <View style={styles.tipsToolView}>
              <Image source={require('../img/yongcantixing.png')} style={[styles.tipsToolImg, {width: 20}]}
                     resizeMode='stretch'/>
              <Text style={styles.tipsToolImgText}>用餐提醒</Text>
            </View>
            <Text style={styles.tipsToolText}>11:50</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: device.width()
  },
  title: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  titleText: {
    fontFamily: 'PingFang SC',
    lineHeight: 20,
    color: 'rgb(255,122,162)',
    fontSize: 15
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  dashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 3
  },
  clockView: {
    borderColor: '#fe7aa2',
    backgroundColor: '#fff5f8',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 13,
  },
  tipsView: {
    borderColor: '#6cdafe',
    backgroundColor: '#f5feff',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 15,
  },
  tipsTool: {
    marginTop: 15,
    marginBottom: 10,
    borderColor: '#7ce37c',
    backgroundColor: '#f7fff7',
    width: (device.width() - 58) / 3
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginLeft: 5
  },
  text: {
    color: 'rgb(146,146,146)',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 7,
    fontFamily: 'PingFang SC'
  },
  tipsToolView: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
    // marginLeft: 10,
  },
  tipsToolImg: {
    width: 15,
    height: 17,
    marginRight: 5,
    marginLeft: -12
  },
  tipsToolImgText: {
    fontFamily: 'PingFang SC',
    fontSize: 12,
    color: 'rgb(146,146,146)',
    paddingTop: 2
  },
  tipsToolText: {
    alignSelf: 'center',
    fontFamily: 'PingFang SC',
    fontSize: 18,
    color: 'rgb(146,146,146)',
    marginTop: 8,
    marginBottom: 8
  }
});

module.exports = Checked;