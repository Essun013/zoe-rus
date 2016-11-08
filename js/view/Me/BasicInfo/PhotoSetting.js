/**
 * Created by sea35 on 2016/10/21.
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image,View,NativeModules} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import {SquareImageCropper} from  '../../../components/ImageCrop/ImageCrop'

class  PhotoSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:require('./img/photo.png')
        }
    }
    onBasicInfoPress() {
        navPush.pop(this.props);
    }
    onImageCrop(){
        navPush.push(this.props,SquareImageCropper,'图片选择');
    }
    pickSingle() {
        ImagePicker.openPicker({
            width: 80,
            height: 80,
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
            alert(e);
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
                    <ImgButton text="选择图片" onClick={this.onImageCrop.bind(this)}></ImgButton>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="提交" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>
                <SquareImageCropper />
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

export default PhotoSetting