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
import LoadingComponent from '../../components/Loading/LoadingComponent';
import INav from '../../components/Nav/INav';
import SearchEmpty from './SearchEmpty';

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
            kw:null,
            hotWords: ['奶粉','产后塑身','纸尿裤','黄疸','鱼肝油','坐月子','等等等等','啊啊啊啊'],
            loading: false,
            searchRequest: undefined,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => (row1 != row2),
            }),


        };

        this.toCancel = this.toCancel.bind(this);
        this.toSearchHotWord = this.toSearchHotWord.bind(this);
        this.didChangeText = this.didChangeText.bind(this);
        this.onEndEditText = this.onEndEditText.bind(this);

    }

    //渲染导航栏
    _renderINav(){
        this.props.iNavBar(this, {
            title: this._navTitle.bind(this),
            left: ()=>{},
        });
    }

    //取消跳转回去
    toCancel(){
        navPush.pop(this.props);
    }

    //跳传热词搜索
    toSearchHotWord(hotWord){
        this.didChangeText("#"+hotWord+"#");
    }

    //获取输入框的值
    text() {
        return this.refs._textInput.value;
    }

    //文本改变时
    didChangeText(text) {
        //console.log('didChangeText...' + this.refs._textInput);
        this.setState({ kw: text});
    }

    //结束输入搜索
    onEndEditText(){
        console.log('onEndEditText...'+ typeof this.state.kw);
        if(this.state.kw.trim() === ''){
            this.setState({
                kw: '',
            });
            return;
        }

        if (this.state.searchRequest){
            this.state.searchRequest.cancel();
        }
        var promise = http.apiFetch('kb/knowledge/search?', {kw: this.state.kw}, (result, error) => {
            console.log('搜索完毕！结果：' + JSON.stringify(result));
            if (result && result.code === 0) {
                var data = result.data; //返回数据
                    if(data.count === 0){ //查询结果条数

                    } else {

                    }
            } else if(result.code === 2103){
                Alert.alert(result.message);
            } else {

            }

            setTimeout(() => {//延迟0.5秒显示
                this.setState({
                    loading: false,
                });
            }, 1000);

        });
        this.setState({
            loading: true,
            searchRequest: promise,
        });
    }

    //导航栏搜索
    _navTitle(){
        //Alert.alert('title', JSON.stringify(this.state))
        console.log('render..._navTitle');
        return <View style={styles.searchRow}>
            <TextInput
                ref='_textInput'
                autoCorrect={true}
                autoFocus={true}
                multiline = {false}
                autoCapitalize = 'none'
                style={styles.searchTextInput}
                placeholder='请输入关键词'
                placeholderTextColor='rgb(200,200,200)'
                returnKeyType='search'
                keyboardType = "default"
                underlineColorAndroid='white'
                value={this.state.kw}
                onChangeText={(newText)=>this.didChangeText(newText)}
                onEndEditing={()=>this.onEndEditText()}
            />

            <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={()=>{this.toCancel()}} >
                <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
        </View>
    }

    //首次进来默认渲染关键热词
    _renderDefaultHotWord(){
        return (<View>
                <View>
                    <Text style={styles.searchHotText}>热门搜索</Text>
                </View>
                <View style={styles.hotWordsView}>
                {this.state.hotWords.map((val, index)=>{
                    return <TouchableOpacity key={index} style={styles.searchHotWords} onPress={()=>this.toSearchHotWord(val)}>
                        <Text>{val}</Text>
                    </TouchableOpacity>
                })}
            </View>
         </View>);
    }

    //渲染结果列表
    _renderSearchResult(){
        return (
            <View>
                <Text>这是搜索结果！</Text>
            </View>
        );
    }

    render() {

        //先渲染导航栏
        this._renderINav();

        var contentPage;
        if(this.state.loading){
            contentPage = <LoadingComponent text="" />;
        } else {
            if (this.state.dataSource.getRowCount()>0) {
                contentPage = this._renderSearchResult();
            } else {
                contentPage = <SearchEmpty {...this.props} kw={this.state.kw} defaultRender={()=>this._renderDefaultHotWord()}/>;
            }
        }

        return (
            <View style={styles.container}>
                
                {contentPage}
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
        fontSize: 17,
        paddingLeft: 8,
    },
    searchTextInput: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 5,
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color:'rgb(200,200,200)',
        //lineHeight: 3,
        width:device.width()/6*5,
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

});

module.exports = Search;