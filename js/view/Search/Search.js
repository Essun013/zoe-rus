/**
 * Created by linys on 2016/11/1.
 */
import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    Alert} from 'react-native';
import device from '../../common/util/device';

//搜索界面
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord:'hello!'
        };
    }

    render() {
        return (
            <View style={styles.searchRow}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    placeholder="Please input your name..."
                    style={styles.searchTextInput}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: device.width(),
        backgroundColor:'#fff',
    },
    searchRow: {
        backgroundColor: '#eeeeee',
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    searchTextInput: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 3,
        borderWidth: 1,
        height: 30,
        paddingLeft: 8,
    },

});

module.exports = Search;