/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Alert} from 'react-native'
import {device, http, rcache, app, gps} from '../../common/util';
import {Top} from './Top';
import {Mom} from './Mom';
import {Box} from './Box';
import {Check} from './Check';
import {Clazz} from './Clazz';

class Home extends Component {
    constructor(props){
        super(props);

        /*gps.getLocation((d) => {
            Alert.alert('location', JSON.stringify(d))
        }, (e) => {
            Alert.alert('error', e.message)
        });*/

        this.state = {
            content: null
        };

        http.apiPost('/uc/timeline/get', {}, (data) => {

            if (data.code === 0) {
                var preDays = data.data.day;

                var week = Math.floor(preDays / 7);
                var days = preDays - (week * 7);

                this.scroll(week+'', days+'', preDays+'');
            }
        })
    }

    scroll(week, days, totalDay) {
        let scroll = (<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Top navigator={this.props.navigator} week={week} days={days}/>
            <Mom navigator={this.props.navigator} week={week} days={days}/>
            <Box navigator={this.props.navigator} week={week} days={days}/>
            <Check navigator={this.props.navigator} week={week} days={days}/>
            <Clazz navigator={this.props.navigator} week={week} totalDay={totalDay}/>
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