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
import {device, http, app} from '../../common/util';
import {navPush} from '../../components/Nav/Nav';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import INav from '../../components/Nav/INav';
import Content from '../Find/Content/Content';
import SearchEmpty from './SearchEmpty';

//搜索界面
class Search extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        textChangeHandler: PropTypes.func,
    };


    constructor(props) {
        super(props);
        this.state = {
            textPlaceholder:'',//搜索框默认现实的值
            kw:null,
            hotWords: ['奶粉','产后塑身','纸尿裤','黄疸','鱼肝油','坐月子','NBA','准妈妈'],
            loading: false,
            startSearch: false,
            onTextFocus: false,
            searchRequest: undefined,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => (row1 != row2),
            }),
        };

        this.toCancel = this.toCancel.bind(this);
        this.toSearchHotWord = this.toSearchHotWord.bind(this);
        this.onSubmitEditText = this.onSubmitEditText.bind(this);
        this.onEndEditText = this.onEndEditText.bind(this);
        this._renderDefaultHotWord = this._renderDefaultHotWord.bind(this);
        this.setTextFocus = this.setTextFocus.bind(this);

    }

    componentWillMount(){
        //先渲染导航栏(隐藏)
        this.props.iNavBar(this, {
            hide:true,
        });
    }

    //取消跳转回去
    toCancel(){
        navPush.pop(this.props);
    }

    //跳传热词搜索
    toSearchHotWord(hotWord){
        this.setState({kw: hotWord, onTextFocus: false , loading: true});
        //检索热词
        var promise = http.apiFetch('kb/knowledge/search?', {kw: hotWord}, (result, error) => {
            console.log('搜索完毕！结果：' + JSON.stringify(result));
            if (result && result.code === 0) {
                var data = result.data; //返回数据

                setTimeout(() => {//延迟1秒显示
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data.list),
                        loading: false,
                    });
                }, 1000);
            } else {
                Alert.alert("错误!message："+result.message+"|code:"+result.code);
            }
        });
        dismissKeyboard();
    }

    //获取输入框的值
    text() {
        return this.refs._textInput.value;
    }

    //结束输入搜索
    onSubmitEditText(){
        console.log("开始搜索：" + this.state.kw);
        if(this.state.kw === null || this.state.kw.trim() === ''){
            //Alert.alert('请输入关键词！');
            this.setState({
                kw: '',
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => (row1 != row2),
                }),
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
                setTimeout(() => {//延迟1秒显示
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data.list),
                        loading: false,
                    });
                }, 1000);

            } else {
                Alert.alert("错误!message："+result.message+"|code:"+result.code);
            }
        });
        this.setState({
            loading: true,
            onTextFocus: false,
            searchRequest: promise,
        });
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(row, sectionId, index) => this._renderSearchResultList(row, sectionId, index)}
            />
        );
    }
    _renderSearchResultList(row, sectionId, index){
        return (
        <TouchableOpacity style={styles.listView}
                onPress={()=>this.toTopicDetail({topicId:row.id,subject:row.subject,read:row.read,favorite:row.favorite})}>
            <Image source={row.thumbnail?{uri: app.apiUrl+row.thumbnail}:require('./img/default-search-result.jpg')} style={styles.listViewImg}/>
            <View style={{flex: 1}}>
                <Text style={styles.listViewContentTitle}>{row.subject}</Text>
            </View>
        </TouchableOpacity>)
    }


    //搜索框失去焦点
    onEndEditText(){
        this.setState({
            onTextFocus: false,
        });
    }
    //搜索框获取焦点
    setTextFocus(){
        //console.log('setTextFocus......' + this.state.onTextFocus);
        this.setState({
            onTextFocus: true,
        });
    }

    render() {
        console.log('render......' + this.state.dataSource.getRowCount());

        var contentPage;
        if(this.state.loading){
            contentPage = <LoadingComponent text="搜索中..." />;
        } else {
            if (this.state.dataSource.getRowCount()>0) {
                if(this.state.onTextFocus){
                    contentPage = <SearchEmpty {...this.props} kw={this.state.kw} onTextFocus={this.state.onTextFocus} defaultRender={()=>this._renderDefaultHotWord()}/>;
                } else{
                    contentPage = this._renderSearchResult();
                }
            } else if(this.state.dataSource.getRowCount() === 0) {
                contentPage = <SearchEmpty {...this.props} kw={this.state.kw} onTextFocus={this.state.onTextFocus} defaultRender={()=>this._renderDefaultHotWord()}/>;
            } else {
                contentPage = this._renderDefaultHotWord();
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.searchRow}>
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
                        //underlineColorAndroid='white'
                        value={this.state.kw}
                        onChangeText={(newText)=>this.setState({ kw: newText})}
                        onEndEditing={this.onEndEditText}
                        onSubmitEditing={this.onSubmitEditText}
                        onFocus={this.setTextFocus}
                    />

                    <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={()=>{this.toCancel()}} >
                        <Text style={styles.cancel}>取消</Text>
                    </TouchableOpacity>
                </View>

                {contentPage}
            </View>
        );
    }


    //跳转文章详细信息
    toTopicDetail(topicDetailInfo){
        navPush.push(this.props, Content, "内容详情", topicDetailInfo);
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
        paddingTop: 24,
        paddingLeft: 8,
    },
    searchTextInput: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        marginTop: 30,
        marginLeft: 10,
        padding: 0,
        paddingLeft: 5,
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color:'rgb(200,200,200)',
        //lineHeight: 3,
        width:device.width()/6*5,
    },
    searchRow: {
        backgroundColor: 'rgb(255,80,120)',
        flexDirection: 'row',
        //marginLeft: 10,
        //marginTop: 27,
        height:60,
        width:device.width(),
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
    listView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
        //backgroundColor: 'blue'
    },
    listViewImg: {
        width: device.width()/6,
        height: 50,
        marginRight: 10,
        borderRadius: 3,
    },
    listViewContentTitle: {
        paddingTop: 2,
        //paddingBottom: 5,
        fontSize: 15,
        fontFamily: 'PingFang SC',
        color: 'rgb(0,0,0)'
    },

});

module.exports = Search;