/**
 * Created by linys on 16/10/18.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import device from '../../../common/util/device';

class WeekTab extends Component {

    constructor(props) {
        console.log('------0.constructor------');
        super(props);
        this.state = {initTab : 8, currentTab: 8}; //默认初始页，选中页
        //this.ScrollableTabView.state = {}
        this.switchTab =  this.switchTab.bind(this);
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }

    componentWillMount(){
        console.log('------1.componentWillMount------');
    }
    componentDidMount(){
        console.log('------2.componentDidMount------');
        this.weekTabRender();
    }
    componentWillUnMount(){
        console.log('------3.componentWillUnMount------');
    }

    getCurrentTab(){
        return this.state.currentTab;
    }

    _onPressIn(){
        console.log("_onPressIn");
    }

    _onPressOut(){
        console.log("_onPressOut");
    }

    //切换Tab方法(改变样式)
    switchTab(selectWeek){
        //this.setState({currentTab: week});
        this.setState({currentTab: selectWeek});
        console.log(selectWeek);
    }

    _renderUnSelectTab(week){
        return (
            <Text style={styles.tabText}>{week}周</Text>
        );
    }

    _renderSelect(week){
        return (
            <Image source={require('../img/finger.png')} style={{height:50,width:50,alignItems:'center'}} >
                <Text style={styles.tabText}>{week}周</Text>
                <Image source={require('../img/rectangle.png')} style={{width:device.width()/5,height:3,marginTop:10}}/>
            </Image>
        );
    }

    weekTabRender(){
        let weekListStart = 5;
        let weekListEnd = 14;
        var listView = {};
        for(i=weekListStart;i<weekListEnd;i++){
            listView = (<View style={styles.scrollViewTab}>
                <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab({i})}>
                    {{i}===this.state.currentTab?this._renderSelect({i}):this._renderUnSelectTab({i})}
                </TouchableOpacity>
            </View>)
        };
        console.log(listView);
        return listView;
    }


    render() {
        return (
            <Image source={require('../img/background.png')} style={styles.tabBgImg} resizeMode='stretch' >
                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(6)}>
                            {6===this.state.currentTab?this._renderSelect(6):this._renderUnSelectTab(6)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(7)}>
                            {7===this.state.currentTab?this._renderSelect(7):this._renderUnSelectTab(7)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(8)}>
                            {8===this.state.currentTab?this._renderSelect(8):this._renderUnSelectTab(8)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(9)}>
                            {9===this.state.currentTab?this._renderSelect(9):this._renderUnSelectTab(9)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(10)}>
                            {10===this.state.currentTab?this._renderSelect(10):this._renderUnSelectTab(10)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(11)}>
                            {11===this.state.currentTab?this._renderSelect(11):this._renderUnSelectTab(11)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(12)}>
                            {12===this.state.currentTab?this._renderSelect(12):this._renderUnSelectTab(12)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewTab}>
                        <TouchableOpacity style={styles.tabTextCenter} onPress={()=>this.switchTab(13)}>
                            {13===this.state.currentTab?this._renderSelect(13):this._renderUnSelectTab(13)}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        width: device.width()/5,
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