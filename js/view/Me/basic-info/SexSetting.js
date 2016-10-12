/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio,Picker} from 'react-native'
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';



class SexSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            label: '',
        }
    }
    onBasicInfoPress() {
        navPush.pop(this.props);
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>性别</Text>
                        <View style={styles.textInput}>
                            <Picker
                                style={{width:200}}
                                selectedValue={this.state.value}
                                onValueChange={(value,label) => this.setState({value: value,label:label})}>
                                <Picker.Item label="男" value="1" />
                                <Picker.Item label="女" value="2" />
                            </Picker>
                            <Text style={{height: 40, fontSize: 15}}> {this.state.label}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="提交" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        marginTop: 10,
        width: device.width(),
        backgroundColor: '#ffffff'
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
    },
    textInput: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 10,
    },
    title: {
        fontSize: 15,
        color: '#bbbbbb'
    },
    submitBut:{
        marginTop: 20,
        width: device.width(),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default SexSetting