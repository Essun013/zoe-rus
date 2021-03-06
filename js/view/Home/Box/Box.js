/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Picker,
    Alert} from 'react-native';
import {navPush} from '../../../components/Nav/Nav';
import {device, jsons} from '../../../common/util';
import Expectant from '../../Box/Expectant/Expectant';
import Fetalmove from '../../Box/Fetalmove/Fetalmove';
import Named from '../../Box/Named/Named';
import Eatorno from '../../Box/Eatorno/Eatorno';
import WeightSacle from '../../Box/WeightSacle/WeightSacle';

var list = [
  {
    img: require('../../Find/img/box/dcb.png'),
    text: '待产包',
    comp: Expectant
  },
  {
    img: require('../../Find/img/box/std.png'),
    text: '数胎动',
    comp: Fetalmove
  },
  {
    img: require('../../Find/img/box/yzc.png'),
    text: '体重计',
    comp: WeightSacle
  },
  {
    img: require('../../Find/img/box/qmz.png'),
    text: '起名字',
    comp: Named
  },
  {
    img: require('../../Find/img/box/nbnc.png'),
    text: '能不能吃',
    comp: Eatorno
  },
  {
    img: require('../../Find/img/box/bbfs.png'),
    text: '宝宝辅食',
    comp: null
  },
];

const boxComp = {
  comp: null
};

export const boxUtil = {
  data: null,
  renders(data) {
    this.data = data;
    boxComp.comp.setState({refresh: !boxComp.comp.state.refresh});
  },
};

export default class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false,
      testMore: null
    };

    boxComp.comp = this;
  }

  scrollBottom() {
    var dataList = boxUtil.data || list;
    return (
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                  scrollEnabled={jsons.length(dataList) > 4}>
        {
          dataList.map((l, i) => {
            return <View style={styles.buttonView} key={i}>
              <TouchableOpacity style={styles.buttonTextCenter} onPress={() => {
                l.comp && navPush.push(this.props, l.comp, l.text);
              }} activeOpacity={0.7}>
                <Image source={l.img} style={styles.buttonImgSize}/>
                <Text style={[styles.titleText]}>{l.text}</Text>
              </TouchableOpacity>
            </View>
          })
        }
      </ScrollView>
    )
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.title}>
        <View>
          <Text
            style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>{this.state.testMore || '百宝箱'}</Text>
        </View>
        <View style={styles.titleBotton}>
          <TouchableOpacity onPress={() => {
            this.props.showMore(true)
          }}>
            <Text style={[styles.titleText, {color: 'rgb(146,146,146)', fontSize: 13}]}>更多</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        {this.scrollBottom()}
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
  },
  titleBotton: {
    position: 'absolute',
    right: 15,
  },
  body: {
    flex: 1,
    marginTop: 1,
    backgroundColor: '#fff',
  },
  buttonView: {
    marginTop: 15,
    marginBottom: 15,
    width: device.width() / 4
  },
  buttonImgSize: {
    width: 46,
    height: 46,
    marginBottom: 14
  },
  buttonTextCenter: {
    alignItems: 'center'
  }
});