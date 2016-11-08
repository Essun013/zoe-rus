/**
 * Created by ianchen on 2016/11/4.
 */

import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ListView, Alert} from 'react-native';
import {device, http} from '../../common/util';

var provinces, _city;

export default class CityPicker extends Component {
    static propTypes = {
        hide: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            provinceList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            cityList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            countyList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            currentProvince: this.props.province,
            currentCity: this.props.city,
            currentCounty: this.props.county,
            callbackNation: null,
            callbackProvince: null,
            callbackCity: null,
            callbackCounty: null
        };

        http.apiPost('/classify/tree', {key: 'region'}, (data) => {
            if (data.code == 0) {
                provinces = data.data[0]['children'];
                var _citys, _countys;
                for (let i in provinces) {
                    if (provinces[i]['id'] == this.state.currentProvince) {
                        _city = _citys = provinces[i].children;
                        break;
                    }
                }

                for (let i in _citys) {
                    if (_citys[i]['id'] == this.state.currentCity) {
                        _countys = _citys[i].children;
                        break;
                    }
                }

                this.setState({
                    provinceList: this.state.provinceList.cloneWithRows(provinces),
                    cityList: this.state.cityList.cloneWithRows(_citys || []),
                    countyList: this.state.countyList.cloneWithRows(_countys || []),
                })
            } else {
                Alert.alert('', '城市信息获取失败' + JSON.stringify(data))
            }
        }, (e) => {
            Alert.alert('错误', '城市信息获取失败' + e.message)
        });
    }

    _childSum(array) {
        if (!array || !array[0])
            return 0;

        if (!array[0]['children'])
            return 1;

        return 1 + this._childSum(array[0]['children']);
    }

    provinceList(row) {
        return <TouchableOpacity style={[styles.provinceBottom]} onPress={() => {
            this.changeSelectProvince(row)
        }} activeOpacity={0.9}>
            <Text
                style={[styles.provinceTx, this.state.currentProvince == row.id && {color: 'rgb(1,1,1)'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    changeSelectProvince(row) {
        let _provinces = JSON.parse(JSON.stringify(provinces || []));
        _city = row.children;
        this.setState({
            provinceList: this.state.provinceList.cloneWithRows(_provinces),
            currentProvince: row.id,
            cityList: this.state.cityList.cloneWithRows(row.children),
            callbackProvince: row,
        });
    }

    cityList(row) {
        return <TouchableOpacity style={styles.cityBottom} onPress={() => {
            this.changeCity(row)
        }}>
            <Text style={[styles.cityTx, this.state.currentCity == row.id && {color: '#ff7aa2'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    changeCity(row) {
        this.setState({
            cityList: this.state.cityList.cloneWithRows(JSON.parse(JSON.stringify(_city || []))),
            currentCity: row.id,
            city: row.name,
            countyList: this.state.countyList.cloneWithRows(row.children || []),
            callbackCity: row,
        });
    }

    countyList(row) {
        return <TouchableOpacity style={styles.cityBottom} onPress={() => {
            this.setState({currentCounty: row.id, currentCounty: row});
            this.callback();
        }}>
            <Text style={[styles.cityTx, this.state.currentCounty == row.id && {color: '#ff7aa2'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    callback() {
        var nation = this.state.callbackNation,
            province = this.state.callbackProvince,
            city = this.state.callbackCity,
            county = this.state.currentCounty;

        if (!nation)
            ;
        if (!province)
            province = this.state.currentProvince;
        if (!city)
            city = this.state.currentCity;
        if (!county)
            county = this.state.currentCounty;

        this.props.hide({
            nation: nation,
            province: {id: province.id, name: province.name},
            city: {id: city.id, name: city.name},
            county: {id: county.id, name: county.name}
        })
    }

    renderLocation() {
        return (
            <TouchableOpacity style={styles.maskView} activeOpacity={1} onPress={() => {
                this.callback();
            }}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', height: 176, flex: 1}}>
                    <ListView dataSource={this.state.provinceList} renderRow={(row) => this.provinceList(row)}
                              enableEmptySections={true} showsVerticalScrollIndicator={false}/>
                    <ListView dataSource={this.state.cityList} renderRow={(row) => this.cityList(row)}
                              enableEmptySections={true} showsVerticalScrollIndicator={false}/>
                    <ListView dataSource={this.state.countyList} renderRow={(row) => this.countyList(row)}
                              enableEmptySections={true} showsVerticalScrollIndicator={false}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return <View style={styles.container}>
            {this.renderLocation()}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: device.height() - 50,
        backgroundColor: '#fff',
    },
    topView: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        height: 46,
    },
    locationBotton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        paddingLeft: 15,
    },
    searchHospital: {
        flex: 1,
        height: 30,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 3,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        padding: 0
    },
    hospitalView: {},
    hospitalBotton: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    masterTitle: {
        fontSize: 15,
        color: 'rgb(0,0,0)',
        marginBottom: 8,
        fontFamily: 'PingFang SC'
    },
    auxiliaryTitle: {
        fontSize: 12,
        color: 'rgb(146,146,146)',
        fontFamily: 'PingFang SC'
    },
    maskView: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.43)',
    },
    provinceBottom: {
        flex: 1,
        height: 44,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        paddingLeft: 15
    },
    provinceTx: {
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color: 'rgb(146,146,146)'
    },
    cityBottom: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        paddingLeft: 15
    },
    cityTx: {
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color: 'rgb(1,1,1)'
    }
});