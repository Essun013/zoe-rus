/**
 * Created by linys on 16/10/18.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import device from '../../../common/util/device';
import apiHttp from '../../../common/util/http';
import {rcache, synccache} from '../../../common/util';

class WeekTab extends Component {

    static propTypes = {}

    static defaultProps = {
        name: '',
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
    switchTab(obj) {
        console.log("selWeek:"+obj.week);
        //改变tab样式
        this.setState({currentTab: obj.week});
        //触发父组件加载网页内容
        this.props.switchTab(obj.week);

    }

    _renderUnSelectTab(obj) {
        return (
            <Text style={styles.tabText}>{obj.week}周</Text>
        );
    }

    _renderSelect(obj) {
        return (
            <Image source={require('../img/finger.png')} style={{height: 50, width: 50, alignItems: 'center'}}>
                <Text style={styles.tabText}>{obj.week}周</Text>
                <Image source={require('../img/rectangle.png')}
                       style={{width: device.width() / 5, height: 3, marginTop: 10}}/>
            </Image>
        );
    }

    weekTabRender() {
        let weekListStart = 6;
        let weekListEnd = 12;
        var listView = [];
        for (let j = weekListStart; j <= weekListEnd; listView.push(j), j++) ;

        return (<ScrollView horizontal={true} showsVerticalScrollIndicator={false}
                           showsHorizontalScrollIndicator={false}>
            {listView.map((week, index) => {
                return <View style={styles.scrollViewTab} key={index}>
                    <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab({week})} >
                        {{week}===this.state.currentTab? this._renderSelect({week}): this._renderUnSelectTab({week})}
                    </TouchableOpacity>
                </View>
            })}
        </ScrollView>);

        // for(i = weekListStart; i<weekListEnd; i++){
        //     listView.push(<View style={styles.scrollViewTab}>
        //         <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab({i})}>
        //             {{i}===this.state.currentTab?this._renderSelect({i}):this._renderUnSelectTab({i})}
        //         </TouchableOpacity>
        //     </View>)
        // }
        // console.log(listView);
        // return listView;
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