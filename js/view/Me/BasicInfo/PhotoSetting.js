/**
 * Created by sea35 on 2016/10/21.
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image,View,Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import { setUser }  from '../../../actions/me/me';
import {rcache,synccache} from '../../../common/util';
import {http,app} from '../../../common/util';

class  PhotoSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:this.props.user.portrait?{uri:app.apiUrl + this.props.user.portrait}:require('./img/photo.png')
        }
    }
    onBasicInfoPress() {
        let url = app.apiUrl+'commons/ctrl-http/upload';
        let imgUri = this.state.image.uri;

        http.uploadImage(url,imgUri,'uc.user.portrait',(uri)=>{
            if(uri) {
                var user = {
                    ...this.props.user,
                    portrait:uri
                };
                rcache.put("user",JSON.stringify(user));
                this.props.dispatch(setUser(user));
                navPush.pop(this.props);
            }else{
                Alert.alert('上传失败');
            }
        },(err)=>{
            Alert.alert(err);
        });
    }
    pickSingle() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressVideo: true
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => {
            console.log(e.code);
        });
    }
    renderImage(image) {
        return <Image style={{width: 80, height: 80, borderRadius:40}}   source={image} />
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    {this.renderImage(this.state.image)}
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="选择图片" onClick={this.pickSingle.bind(this)}></ImgButton>
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
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
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
const {connect} = require('react-redux');
module.exports = connect()(PhotoSetting);
