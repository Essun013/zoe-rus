/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import Record from './Record';
import INav from '../../components/Nav/INav';


export default class RecordNav extends Component {
    render() {
        return <INav route={{component: Record, title: '记录'}} titleCenter={true} statusBarColor={'#ff4971'} barStyle={{
            backgroundColor: '#ff4971',
            ...Platform.select({
                ios: {
                    height: 60
                }
            })
        }}/>
    }
}