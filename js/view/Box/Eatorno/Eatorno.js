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
    TouchableWithoutFeedback,
    Image,
    Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';


class Eatorno extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            searchKw:'',
        };
        this.onSubmitEditText = this.onSubmitEditText.bind(this);
    }

    componentDidMount() {
        console.log('---Eatorno---componentDidMount------');
    }
    componentWillMount() {
        console.log('---Eatorno---componentWillMount------');
    }
    componentWillUnmount() {
        console.log('---Eatorno---componentWillUnmount------');
    }

    onSubmitEditText(){
        Alert.alert(this.state.searchKw);
    }


    render(){
        console.log('---Eatorno---render------');

        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <TextInput
                        //autoCorrect={true}
                        //autoFocus={true}
                        multiline = {false}
                        autoCapitalize = 'none'
                        style={styles.searchTextInput}
                        placeholder='孕期能不能吃螃蟹？'
                        placeholderTextColor='rgb(200,200,200)'
                        returnKeyType='search'
                        keyboardType = "default"
                        //underlineColorAndroid='white'
                        value={this.state.searchKw}
                        onChangeText={(newText)=>this.setState({ searchKw: newText})}
                        //onEndEditing={this.onEndEditText}
                        onSubmitEditing={this.onSubmitEditText}
                        //onFocus={this.setTextFocus}
                    />
                    <Image source={require('../img/eatornot/search.png')} style={styles.searchImg}  />
                </View>
                 <View style={{flex:1, backgroundColor:'#fff', flexWrap:'wrap', flexDirection:'row'}}>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('111')}>
                         <Image source={require('../img/eatornot/zs.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('222')}>
                         <Image source={require('../img/eatornot/jg.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('333')}>
                         <Image source={require('../img/eatornot/ls.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('444')}>
                         <Image source={require('../img/eatornot/yl.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('555')}>
                         <Image source={require('../img/eatornot/dnzp.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('6')}>
                         <Image source={require('../img/eatornot/twl.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('7')}>
                         <Image source={require('../img/eatornot/rdl.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('8')}>
                         <Image source={require('../img/eatornot/sg.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('9')}>
                         <Image source={require('../img/eatornot/scp.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('10')}>
                         <Image source={require('../img/eatornot/sc.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('11')}>
                         <Image source={require('../img/eatornot/bpcy.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback style={styles.touch} onPress={()=>console.log('12')}>
                         <Image source={require('../img/eatornot/jgsp.png')} style={styles.img} />
                     </TouchableWithoutFeedback>
                 </View>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(245,245,245)',
    },
    touch:{
        width:device.width()/3,
        height:device.width()/3,
        //backgroundColor:'red',
    },
    img:{
        width:device.width()/3,
        height:device.width()/3,
        resizeMode:'stretch',
    },
    searchImg:{
        position:'absolute',
        left:22,
        top:20,
        height:22,
        width:22,
        resizeMode:'stretch',
    },
    searchTextInput: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        height: 30,
        padding: 0,
        paddingLeft: 28,
        marginVertical:16,
        fontFamily: 'PingFang SC',
        fontSize: 18,
        color:'rgb(200,200,200)',
        width:device.width()/11*10,
    },

});

module.exports = Eatorno;