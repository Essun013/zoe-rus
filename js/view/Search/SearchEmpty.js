/**
 * Created by linys on 2016/11/10.
 */
import React, {Component, PropTypes} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    TextInput,
    Platform,
    Alert} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import device from '../../common/util/device';
import http from '../../common/util/http';
import {navPush} from '../../components/Nav/Nav';
import INav from '../../components/Nav/INav';

//搜索暂无相关信息界面
class SearchEmpty extends Component {

    // 默认属性
    static defaultProps = {};
    // 属性类型
    static propTypes = {
    };

    constructor(props) {
        super(props);
        //console.log("this.props.kw=" + this.props.kw);
        //console.log("this.defaultRender=" + this.props.defaultRender());
        this.onTapPage = this.onTapPage.bind(this);
    }

    // 自定义方法
    onTapPage() {
        console.log('onTapPage!!!');
        dismissKeyboard();
    }

    renderEmpty(){
        return <TouchableWithoutFeedback onPress={this.onTapPage}>
            <View style={styles.emptypageContainer}>
                <Image style={styles.icon} source={require('./img/icon-search-gray.png')} />
                <Text style={styles.text}>抱歉，暂无相关搜索结果</Text>
            </View>
        </TouchableWithoutFeedback>
    }

    render(){

        var empty;
        if(this.props.kw === null || this.props.kw === ''){
            empty = this.props.defaultRender();
        } else {
            if(this.props.onTextFocus){
                empty = this.props.defaultRender();
            } else {
                empty = this.renderEmpty();
            }
        }
        return (
            <View>
                {empty}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emptypageContainer: {
        //flex: 1,
        //backgroundColor: 'red',
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    icon:{
        marginTop: 250,
        marginBottom: 250,
        width: 19,
        height: 19,
        marginRight: 19,
    },
    text:{
        marginTop: 250,
        marginBottom: 250,
        fontSize: 19,
        color: 'rgb(143,143,143)'
    }
});


module.exports = SearchEmpty;
