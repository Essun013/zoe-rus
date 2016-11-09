/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {StyleSheet, Alert, TouchableOpacity} from 'react-native'
import {ListItem, ListScroll} from '../../../components'
import {navPush} from '../../../components/Nav/Nav';
import Content from '../../Find/Content/Content';

class Favorite extends Component {
    constructor(props) {
        super(props);
        this._openContent = this._openContent.bind(this);
    }

    _openContent(id) {
        navPush.push(this.props,Content,'内容',{topicId:id})
        //Alert.alert(id);
    }

    _renderRow(rowData, SectionId, rowID) {
        return (
                <ListItem
                    //avatar={rowData.aummary}
                    avatar={'http://img05.tooopen.com/images/20150202/sy_80219211654.jpg'}
                    key={rowID}
                    title={rowData.subject}
                    subtitle={rowData.label || null}
                    subtitleStyle={{flexWrap: 'wrap'}}
                    avatarStyle={{
                        width: 60,
                        height: 60
                    }}
                    onPress={()=>this._openContent(rowData.id)}
                />
        )
    }

    render() {
        const dataSource = {
            uri: '/uc/favorite/query',
            params: {
                type: 1
            }
        }
        return (
            <ListScroll
                dataSource={dataSource}
                renderRow={this._renderRow.bind(this)}
                pageSize={8}
            />
        )
    }
}

const styles = StyleSheet.create({})
module.exports = Favorite;

