/**
 * Created by linys on 11/15/2016.
 */
"use strict";
import ReactNative, {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { Component , PropTypes } from 'react';

const ButtonWidth = 60;
const IconWidth = 45;

class ShareActionButton extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {
    imageSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
    name: PropTypes.string,
    handler: PropTypes.func,
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.handler}>
        <View style={styles.container}>
          <Image source={this.props.imageSource} style={styles.icon}/>
          <Text style={styles.text} numberOfLines={1}>
            {this.props.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: ButtonWidth,
    height: 65,
  },
  icon: {
    width: IconWidth,
    height: IconWidth,
    alignSelf: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 11,
    color: 'rgb(91,91,91)',
    textAlign: 'center',
  },
});

export default ShareActionButton;

ShareActionButton.ButtonWidth = ButtonWidth;
ShareActionButton.IconWidth = IconWidth;
