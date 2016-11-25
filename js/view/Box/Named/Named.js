/**
 * Created by linys on 2016/11/24.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import {ImgButton, ModalPicker} from '../../../components';


class Named extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            lastname:'',
            sex:'不分男女',
        };

        //导航栏


    }

    componentDidMount() {
        console.log('---Named---componentDidMount------');
    }
    componentWillMount() {
        console.log('---Named---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---Named---componentWillUnmount------');
    }


    render(){
        console.log('---Named---render------');
        const data = [{key:0, label: '不分男女'},{key:1,label: '男生'},{key:2,label: '女生'}];

        return (
            <View style={styles.container}>
                <View style={[styles.row,{marginTop:15}]}>
                    <View style={styles.title}><Text style={styles.titleText}>姓氏</Text></View>
                    <View style={styles.input}>
                        <TextInput
                              multiline = {false}
                              autoFocus={true}
                              style={styles.lastnameTextInput}
                              placeholder='王'
                              placeholderTextColor='rgb(200,200,200)'
                              value={this.state.lastname}
                              onChangeText={(newText)=>this.setState({ lastname: newText})}
                              //onEndEditing={this.onEndEditText}
                              //onSubmitEditing={this.onSubmitEditText}
                              //onFocus={this.setTextFocus}
                        />
                    </View>
                </View>
                <View style={[styles.row,{marginBottom:30}]}>
                    <View style={styles.title}><Text style={styles.titleText}>性别</Text></View>
                    <View style={styles.input}>
                        <ModalPicker data={data}
                                     onChange={(option)=>{ this.setState({sex:option.label})}}>
                            <TextInput
                                style={{height: 40, fontSize: 15,width: 260,marginLeft: 10}}
                                editable={false}
                                underlineColorAndroid={'transparent'}
                                value={this.state.sex} />
                        </ModalPicker>
                    </View>
                </View>
                <View style={{alignItems:'center'}}><ImgButton text="确定" onClick={()=>Alert.alert(this.state.lastname?this.state.lastname:'请输入姓')}></ImgButton></View>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(245,245,245)',
    },
    row:{
        marginTop:1,
        flexDirection:'row',
        backgroundColor:'#fff',
    },
    title:{
        flex:1,
    },
    titleText:{
        paddingLeft:20,
        color:'rgb(146,146,146)',
        fontFamily: 'PingFang SC',
        lineHeight:40,
        fontSize:15,
    },
    input:{
        flex:3,
        justifyContent:'center',
    },
    lastnameTextInput:{
        height: 24,
        padding: 0,
        paddingLeft:10,
        //backgroundColor:'red',
        fontFamily: 'PingFang SC',
        fontSize: 14,
        //color:'rgb(200,200,200)',
    }


});

module.exports = Named;