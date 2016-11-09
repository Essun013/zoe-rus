/**
 * Created by linys on 2016/11/1.
 */
import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ListView,
    ScrollView,
    TextInput,
    Platform,
    Alert} from 'react-native';
import device from '../../common/util/device';
import http from '../../common/util/http';
import {navPush} from '../../components/Nav/Nav';
import INav from '../../components/Nav/INav';

//搜索界面
class Search extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        textChangeHandler: PropTypes.func
    };


    constructor(props) {
        super(props);
        this.state = {
            textPlaceholder:'',//搜索框默认现实的值
            kw:'',
            hotWords: ['奶粉','产后塑身','纸尿裤','黄疸','鱼肝油','坐月子','等等等等','啊啊啊啊'],
            loading: false,
            searchRequest: undefined,
        };

        this.props.iNavBar(this, {
            title: this._navTitle.bind(this),
            left: (o, i, k)=>{},
        });

        this.toCancel = this.toCancel.bind(this);
        this.toSearch = this.toSearch.bind(this);

    }

    toCancel(){
        navPush.pop(this.props);
    }

    toSearch(hotWord){
        this.setState({
            kw: hotWord
        });
        //Alert.alert(hotWord);
    }

    //获取输入框的值
    text() {
        return this._textfield.value;
    }

    //自定义搜索方法
    didChangeText(text) {
        //Alert.alert("你搜索了：" + text);
        if (this.state.searchRequest){
            this.state.searchRequest.cancel();
        }
        var promise = http.apiFetch('kb/knowledge/search?', {kw: text}, (result, error) => {
            if (result) {
                console.log('搜索完毕！结果：' + JSON.stringify(result));
                this.setState({
                    loading: false,
                    kw: text,
                });
            }
        });
        this.setState({
            loading: true,
            searchRequest: promise,
            kw: text,
        })

    }

    _navTitle(){

        const placeholderColor = 'rgb(200,200,200)';

        return <View style={styles.searchRow}>
            <TextInput
                ref={(ref)=>{this._textfield = ref}}
                autoCorrect={true}
                autoFocus={true}
                style={styles.searchTextInput}
                placeholder='请输入关键词'
                placeholderTextColor={placeholderColor}
                returnKeyType='search'
                multiline = {false}
                keyboardType = "default"
                underlineColorAndroid='white'
                //value={this.state.kw}
                onChangeText={(newText)=>{
                    this.didChangeText(newText)
                }}
            />

            <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={()=>{this.toCancel()}} >
                <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
        </View>
    }

    //渲染关键热词
    _renderHotWord(){
        return <View style={styles.hotWordsView}>
            {this.state.hotWords.map((val, index)=>{
                return <TouchableOpacity key={index} style={styles.searchHotWords} onPress={()=>this.toSearch(val)}>
                    <Text>{val}</Text>
                </TouchableOpacity>
            })}
        </View>;
    }

    render() {
        //var hotWords = this._renderHotWords();
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.searchHotText}>热门搜索</Text>
                </View>
                {this._renderHotWord()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: device.width(),
        //backgroundColor:'#f5f5f5',
        backgroundColor:'#fff',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    cancel:{
        color: 'rgb(255,255,255)',
        fontFamily: 'PingFang SC',
        fontSize: 15,
        paddingLeft: 8,
    },
    searchRow: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 8,
    },
    searchHotText: {
        paddingTop:8,
        paddingLeft:10,
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color:'rgb(146,146,146)',
    },
    searchHotWords: {
        backgroundColor:'#f5f5f5',
        marginTop: 10,
        marginLeft: 10,
        width:device.width()/3.35,
        justifyContent:'center',
        alignItems:'center',
    },
    hotWordsView: {
        //marginTop: 8,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 35,
        width: device.width(),
    },
    searchTextInput: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        height: 22,
        paddingLeft: 5,
        fontFamily: 'PingFang SC',
        fontSize: 14,
        //lineHeight: 3,
        width:device.width()/6*5,
    },

});

module.exports = Search;