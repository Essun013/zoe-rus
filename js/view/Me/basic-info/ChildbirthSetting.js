/**
 * Created by sea35 on 2016/11/2.
 */
/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio} from 'react-native'
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import DatePicker from '../../../components/DatePicker'
import {BasicInfo} from './BasicInfo'
import Moment from 'moment';


class ChildbirthSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childbirth: this.props.childbirth
        }
    }
    onBasicInfoPress() {
        Alert.alert('系统提示','更新预产期');
    }
    render() {
        const format = 'YYYY-MM-DD';
        const childbirthMin = Moment().format(format);
        const childbirthMax = Moment().add(280, 'days').format(format);
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>预产期</Text>
                        <View style={styles.textInput}>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.childbirth}
                                mode="date"
                                placeholder={"预产期是哪一天呢"}
                                format={format}
                                minDate={childbirthMin}
                                maxDate={childbirthMax}
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={dataPickerStyles}
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({childbirth: date})
                                }}
                            />
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
const dataPickerStyles = {
    dateText: {
        fontSize: 16,
        borderWidth: 0,
        width:240,
        marginLeft: 100,
    },
    placeholderText: {
        fontSize: 16,
        color: '#ffec93',
        borderWidth: 0,
        marginBottom: 18,
        width:240,
        height: 40,
        marginLeft: 100,
    },
    dateInputView: {
        borderWidth: 0,
    },
    datePicker: {
        flex: 1
        //marginTop: 1,
    }
};
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
        //alignItems: 'flex-end',
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
export default ChildbirthSetting