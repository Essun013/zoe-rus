/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {Top} from './Top';
import {Mom} from './Mom';
import {Box} from './Box';
import {Check} from './Check';
import {Clazz} from './Clazz';

class Home extends Component {
    render() {
        return <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Top navigator={this.props.navigator}/>
                <Mom navigator={this.props.navigator}/>
                <Box navigator={this.props.navigator}/>
                <Check navigator={this.props.navigator}/>
                <Clazz navigator={this.props.navigator}/>
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