/**
 * Created by linys on 2016/11/28.
 */
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    Image,
    Easing,
    PanResponder,
    Alert} from 'react-native';
import {device} from '../../../common/util';
import px2dp from '../../../common/util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import {navPush} from '../../../components/Nav/Nav';


class WeightSacle extends Component {

    // 默认属性
    static defaultProps = {
    }

    // 属性类型
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.names = ['Android','iOS','前端','拓展资源','休息视频'];
        this.items = [];
        this.order = [];

    }

    componentDidMount() {
        console.log('---WeightSacle---componentDidMount------');
    }
    componentWillMount() {
        console.log('---WeightSacle---componentWillMount------');

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const {pageY, locationY} = evt.nativeEvent;
                this.index = this._getIdByPosition(pageY);
                this.preY = pageY - locationY;
                //get the taped item and highlight it
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {
                        shadowColor: "#000",
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: {height: 0, width: 2},
                        elevation: 5
                    }
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                let top = this.preY + gestureState.dy;
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {top: top}
                });

                let collideIndex = this._getIdByPosition(evt.nativeEvent.pageY);
                if(collideIndex !== this.index && collideIndex !== -1) {
                    let collideItem = this.items[collideIndex];
                    collideItem.setNativeProps({
                        style: {top: this._getTopValueYById(this.index)}
                    });
                    //swap two values
                    [this.items[this.index], this.items[collideIndex]] = [this.items[collideIndex], this.items[this.index]];
                    [this.order[this.index], this.order[collideIndex]] = [this.order[collideIndex], this.order[this.index]];
                    this.index = collideIndex;
                }
                //console.log(this.items);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const shadowStyle = {
                    shadowColor: "#000",
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: {height: 0, width: 0,},
                    elevation: 0
                };
                let item = this.items[this.index];
                //go back the correct position
                item.setNativeProps({
                    style: {...shadowStyle, top: this._getTopValueYById(this.index)}
                });
                console.log(this.order);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            }
        });

    }
    componentWillUnmount() {
        console.log('---WeightSacle---componentWillUnmount------');
    }

    _getIdByPosition(pageY){
        var id = -1;
        const height = px2dp(49);
        if(pageY >= height && pageY < height*2)
            id = 0;
        else if(pageY >= height*2 && pageY < height*3)
            id = 1;
        else if(pageY >= height*3 && pageY < height*4)
            id = 2;
        else if(pageY >= height*4 && pageY < height*5)
            id = 3;
        else if(pageY >= height*5 && pageY < height*6)
            id = 4;
        return id;
    }

    _getTopValueYById(id){
        const height = px2dp(49);
        return (id + 1) * height;
    }

    render(){

        return (
            <View style={[styles.container, {flex: 1}]}>
                {this.names.map((item, i)=>{
                    return (
                        <View
                            {...this._panResponder.panHandlers}
                            ref={(ref) => this.items[i] = ref}
                            key={i}
                            style={[styles.item]}>
                            <Icon name="ios-menu" size={px2dp(25)} color="#ccc"/>
                            <Text style={styles.itemTitle}>{item}</Text>
                        </View>
                    );
                })}
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(245,245,245)',
        //alignItems:'center',
        //justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        flexDirection: 'row',
        height: px2dp(49),
        width: device.width(),
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: px2dp(20),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        position: 'absolute',
    },
    itemTitle: {
        fontSize: px2dp(15),
        color: '#000',
        marginLeft: px2dp(20)
    }

});

module.exports = WeightSacle;