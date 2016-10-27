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
        /*navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                Alert.alert(initialPosition);
            },
            (error) => {
                Alert.alert('error', error.message)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );*/

        this.state = {
            content: null
        };

        http.apiPost('/uc/timeline/get', {}, (data) => {

            if (data.code === 0) {
                var preDays = data.data.day;

                var week = Math.floor(preDays / 7);
                var days = preDays - (week * 7);

                this.scroll(week+'', days+'');
            }
        })
    }

    scroll(week, days) {
        let scroll = (<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Top navigator={this.props.navigator} week={week} days={days}/>
            <Mom navigator={this.props.navigator} week={week}/>
            <Box navigator={this.props.navigator} week={week}/>
            <Check navigator={this.props.navigator} week={week}/>
            <Clazz navigator={this.props.navigator} week={week}/>
        </ScrollView>)

        this.setState({content: scroll});
    }

    render() {
        return <View style={{flex: 1}}>
            {this.state.content}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    }
})

export default Home