/**
 * Created by linys on 11/8/2016.
 */
"use strict";
import React, { Component , PropTypes } from 'react';
import ReactNative, {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicatorIOS,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

class LoadingComponent extends Component {
  // 默认属性
  static defaultProps = {
    text: '加载中...',
  };

  // 属性类型
  static propTypes = {
    text: PropTypes.string,
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {

    StatusBar.setBarStyle('light-content',false)

    let textView ;
    if(this.props.text!=''){
      textView = <Text style={[styles.textStyle,{}]}>{this.props.text}</Text>;
    }

    return (
      <View style={styles.container}>
          <View>
            <ActivityIndicator
                animating={true}
                size="small"
                {...this.props}
            />
          </View>
         {textView}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    margin: 10,
    color: 'rgb(20,20,20)',
    fontSize: 15,
  }
});

export default LoadingComponent;
