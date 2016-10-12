/**
 * Created by ianchen on 16/10/11.
 */

import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Item extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        titleSize: PropTypes.string,
        component: PropTypes.func
    }

    render() {
        return <View style={styles.title}>
            {this.renderTitle(this.props)}
            {this.renderRight(this.props.component)}
        </View>
    }

    renderTitle(props) {
        return (
            <View>
                <Text style={[styles.titleText, {
                    color: props.titleColor,
                    fontSize: props.titleSize
                }]}>{props.title}</Text>
            </View>
        );
    }

    renderRight(component) {
        return component ? (<View style={styles.titleBotton}>{component()}</View>) : null;
    }
}

const styles = StyleSheet.create({
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
    }
})

export default Item