/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Record from './Record';
import INav from '../../components/Nav/INav';


export default class RecordNav extends Component {
    render() {
        return <INav route={{component: Record, title: '记录'}} titleCenter={true}/>
    }
}