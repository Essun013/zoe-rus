/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet,Alert} from 'react-native'
import {device, http, rcache, app} from '../../common/util';
import {Top} from './Top';
import {Mom} from './Mom';
import {Box} from './Box';
import {Check} from './Check';
import {Clazz} from './Clazz';

class Home extends Component {
    constructor(props){
        super(props);
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         var initialPosition = JSON.stringify(position);
        //         Alert.alert(initialPosition);
        //     },
        //     (error) =>Alert.alert(error.message),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // );

        this.state = {
            week: 0,
            days: 0,
        };

        http.apiPost('/uc/timeline/get', {}, (data) => {
            if (data.code == 0) {
                var now = new Date().valueOf();
                var startDate = new Date(data.data.start).valueOf();
                var preDays = Math.floor((now - startDate) / (24 * 3600 * 1000));

                var week = Math.floor(preDays / 7);
                var days = preDays - (week * 7);

                this.setState({week: week, days: days});
            }
        })
    }
    render() {
        return <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Top navigator={this.props.navigator} week={this.state.week} days={this.state.days}/>
                <Mom navigator={this.props.navigator} week={this.state.week}/>
                <Box navigator={this.props.navigator} week={this.state.week}/>
                <Check navigator={this.props.navigator} week={this.state.week}/>
                <Clazz navigator={this.props.navigator} week={this.state.week}/>
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    }
})

export default Home