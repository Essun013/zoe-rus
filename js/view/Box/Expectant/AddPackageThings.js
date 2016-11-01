/**
 * Created by linys on 2016/10/28.
 */

import React, {Component} from 'react';
import {StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Picker,
    Image,
    TextInput,
    Platform,
    Alert
    } from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import {ImgButton, ModalPicker} from '../../../components';
import {addPackage}  from '../../../actions/box/actions';

class AddPackageThings extends Component {

    // 默认属性
    static defaultProps = {}

    // 属性类型
    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            addThingName: '',
            addThingCount: '0',
            addThingClass: '待产妈妈',
        }
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        console.log("-----AddPackageThings---componentDidMount---");
    }

    onSave(){
        //console.log("保存："+this.state);
        if(this.state.addThingName === ''){
            return Alert.alert("请填写物品名称再保存!");
        }
        //return Alert.alert(this.state.addThingName + " 保存!");
        console.log("保存："+this.state);
        this.props.dispatch(addPackage(this.state));
        navPush.pop(this.props);
    }

    render() {
        const data = [{key:0, label: '待产妈妈'},{key:1,label: '新生宝宝'},{key:2,label: '宝爸'}];

        return (
            <View style={styles.container}>
                <View style={[styles.ItemList,{marginTop:10}]}>
                    <Text style={styles.ItemContent}>物品名称</Text>
                    <TextInput style={styles.ItemContentText} onChangeText={text=>this.setState({addThingName: text})}
                        underlineColorAndroid={'transparent'} />
                </View>
                <View style={styles.ItemList}>
                    <Text style={styles.ItemContent}>数量</Text>
                    <TextInput style={styles.ItemContentText} placeholder={'0'} onChangeText={text=>this.setState({addThingCount: text})}
                        underlineColorAndroid={'transparent'}/>
                </View>
                <View style={styles.ItemList}>
                    <Text style={styles.ItemContent}>物品归类</Text>
                    <ModalPicker style={styles.ThingClassPicker}
                        data={data}
                        initValue="Select something yummy!"
                        onChange={(option)=>{ this.setState({addThingClass:option.label})}}>
                        <TextInput
                            style={{height: 40, fontSize: 15,width: 260,marginLeft: 10}}
                            editable={false}
                            underlineColorAndroid={'transparent'}
                            value={this.state.addThingClass} />
                    </ModalPicker>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="保存" onClick={this.onSave}></ImgButton>
                </View>

            </View>
        );

    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    ItemList: {
        //flex:1,
        flexDirection:'row',
        backgroundColor:'#fff',
        marginBottom:2,
    },
    ItemContent:{
        flex:2,
        fontSize:15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        color:'rgb(146,146,146)',
    },
    ItemContentText:{
        flex:4,
        fontSize:15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 14,
    },
    submitBut: {
        marginTop: 20,
        width: device.width(),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ItemPicker:{
        height:200,
        width:device.width()/3*2,
        //backgroundColor:'blue',
    },
    ThingClassPicker: {
        flex: 4,
    },


});

const {connect} = require('react-redux');
module.exports = connect()(AddPackageThings);
