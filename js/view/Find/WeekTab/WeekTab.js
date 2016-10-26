/**
 * Created by linys on 16/10/18.
 */

import React, { Component , PropTypes } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import device from '../../../common/util/device';
import apiHttp from '../../../common/util/http';
import {rcache, synccache} from '../../../common/util';

class WeekTab extends Component {

    // 默认属性
    static defaultProps = {
        scrollCellWidth: device.width()/5,
    }

    // 属性类型
    static propTypes = {
        scrollCellWidth: PropTypes.number,
    }


    constructor(props) {
        console.log('---WeekTab---0.constructor------');
        super(props);
        this.state = {
            currentTab: this.props.week,
        }; //默认初始页，选中页8周
        this.switchTab = this.switchTab.bind(this);
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
        //console.log('---WeekTab---0.constructor------'+this.state.currentTab);

    }

    componentWillMount() {
        console.log('---WeekTab---1.componentWillMount------');
    }

    componentDidMount() {
        console.log('---WeekTab---3.componentDidMount------');
        //this.weekTabRender();
        //this.getBabyGrowDataByWeek(this.state.initTab);
        let scrollToX = this.state.currentTab<3?0:this.state.currentTab-3;
        if(scrollToX >= 43){
            scrollToX = 45;
        }
        this.refs._scrollView.scrollTo({x:this.props.scrollCellWidth*scrollToX,y:0,animated:true});
    }

    componentWillUnMount() {
        console.log('---WeekTab---4.componentWillUnMount------');
    }

    componentWillReceiveProps() {
        //父组件更新时候，触发
        console.log('---WeekTab---5.componentWillReceiveProps------');
    }

    _onPressIn() {
        console.log("_onPressIn");
    }

    _onPressOut() {
        console.log("_onPressOut");
    }

    //切换Tab方法(改变样式)
    switchTab(week) {
        //改变tab样式
        this.setState({currentTab: week});
        //触发父组件加载网页内容
        this.props.switchTab(week);
        let scrollToX = week<3?0:week-3;
        if(scrollToX >= 41){
            scrollToX = 40;
        }
        this.refs._scrollView.scrollTo({x:this.props.scrollCellWidth*scrollToX,y:0,animated:true});
    }

    _renderUnSelectTab(week) {
        return (
            <Text style={styles.tabText}>{week}周</Text>
        );
    }

    _renderSelect(week) {
        return (
            <Image source={require('../img/finger.png')} style={{height: 50, width: 50, alignItems: 'center'}}>
                <Text style={styles.tabText}>{week}周</Text>
                <Image source={require('../img/rectangle.png')}
                       style={{width: device.width() / 5, height: 3, marginTop: 10}}/>
            </Image>
        );
    }

    weekTabRender() {
        var listView = [];
        //一共只有45周内容
        for (let j = 1; j < 46; listView.push(j), j++);
        return (
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                        ref='_scrollView' >
            {listView.map((week, index) => {
                return <View style={styles.scrollViewTab} key={index}>
                    <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(week)} >
                        {week==this.state.currentTab? this._renderSelect(week): this._renderUnSelectTab(week)}
                    </TouchableOpacity>
                </View>
            })}
        </ScrollView>);

    }


    render() {
        console.log('---WeekTab---2.render------');
        return (
            <Image source={require('../img/background.png')} style={styles.tabBgImg} resizeMode='stretch'>
                {this.weekTabRender()}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    tabBgImg: {
        //flex: 1,
        height: 50,
        width: device.width(),
    },
    scrollViewTab: {
        width: device.width() / 5,
        //backgroundColor: 'green',
    },
    tabTextCenter: {
        alignItems: 'center',
    },
    tabText: {
        paddingTop: 15,
        fontSize: 18,
        color: '#ffffff'
    }

});

module.exports = WeekTab;