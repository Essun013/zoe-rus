/**
 * Created by ianchen on 2016/11/4.
 */

import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ListView, Alert, Platform} from 'react-native';
import {device, http, rcache, gps} from '../../common/util';

const cityCacheKey = {
    SINGLE_LOCAL_CACHE : 'single_local_cache'
};
const cityUtil = {
    save(nation, province, city, county) {
        rcache.put(cityCacheKey.SINGLE_LOCAL_CACHE, JSON.stringify({nation, province, city, county}))
    },
    get(callback) {
        rcache.get(cityCacheKey.SINGLE_LOCAL_CACHE, (err, result) => {
            var _result = null;
            try {
                if (result)
                    _result = JSON.parse(result);
            } catch (e) {
            }
            callback(_result);
        })
    },
    gps(callback) {
        gps.getLocation((d) => {
            // lat: 24.489114503076085,  lng: 118.18957659957918
            http.apiPost('/geocoder/address', {lat: '24.489114503076085',  lng: '118.18957659957918'}, (data) => {
                if (data.code == 0) {
                    var _region = data.data.region;
                    var _data = {
                        nation: {..._region[0]},
                        province: {..._region[1]},
                        city: {..._region[2]},
                        county: {..._region[3]}
                    }

                    callback(_data);
                } else {
                    callback(null);
                }
            })
        }, (e) => {
            callback(null);
        });
    }
};

var _tmpProvinces, _tmpCity, returnBack;
class CityPicker extends Component {
    static propTypes = {
        hide: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            provinceList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            cityList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            countyList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
        };

        // 缓存中获取个人保存的城市信息
        cityUtil.get((d) => {
            if (d)
                returnBack = d;
        });

        // 获取全国城市信息
        http.apiPost('/classify/tree', {key: 'region'}, (data) => {
            if (data.code == 0) {
                _tmpProvinces = data.data[0]['children'];
                var _county;
                if (!returnBack)
                    returnBack = {};
                else {
                    for(var i = 0; i < _tmpProvinces.length; i++) {
                        if (_tmpProvinces[i].id == returnBack.province.id) {
                            _tmpCity = _tmpProvinces[i].children;
                            break;
                        }
                    }

                    for(var j = 0; j< _tmpCity.length; j++) {
                        if (_tmpCity[j].id == returnBack.city.id) {
                            _county = _tmpCity[j].children;
                            break;
                        }
                    }
                }

                this.setState({
                    provinceList: this.state.provinceList.cloneWithRows(_tmpProvinces),
                    cityList: this.state.cityList.cloneWithRows(_tmpCity || []),
                    countyList: this.state.countyList.cloneWithRows(_county || [])
                });
            } else {
                Alert.alert('', '城市信息获取失败' + JSON.stringify(data));
            }
        }, (e) => {
            Alert.alert('错误', '城市信息获取失败' + e.message);
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
        var selected = returnBack.province && returnBack.province.id == row.id;
        if (selected) {
            returnBack.province = row;
            _tmpCity = row.children || [];
        }

        return <TouchableOpacity style={[styles.provinceBottom]} onPress={() => {
            this.changeProvince(row)
        }} activeOpacity={0.9}>
            <Text style={[styles.provinceTx, selected && {color: 'rgb(1,1,1)'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    changeProvince(row) {
        let _tmpProvinces = JSON.parse(JSON.stringify(_tmpProvinces || []));
        returnBack.province = row;
        this.setState({
            provinceList: this.state.provinceList.cloneWithRows(_tmpProvinces),
        });
    }

    cityList(row) {
        var selected = returnBack.city && returnBack.city.id == row.id;
        if (selected) {
            returnBack.city = row;
        }

        return <TouchableOpacity style={styles.cityBottom} onPress={() => {this.changeCity(row)}}>
            <Text style={[styles.cityTx, selected && {color: '#ff7aa2'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    changeCity(row) {
        returnBack.city = row;
        this.setState({
            cityList: this.state.cityList.cloneWithRows(JSON.parse(JSON.stringify(_tmpCity || []))),
        });
    }

    countyList(row) {
        return <TouchableOpacity style={styles.cityBottom} onPress={() => {
            returnBack.county = row;
            this.callback();
        }}>
            <Text style={[styles.cityTx, returnBack.county.id == row.id && {color: '#ff7aa2'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    callback() {
        this.props.hide({
            nation: returnBack.nation,
            province: {id: returnBack.province.id, name: returnBack.province.name},
            city: {id: returnBack.city.id, name: returnBack.city.name},
            county: {id: returnBack.county.id, name: returnBack.county.name}
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
        ...Platform.select({
            ios: {
                height: device.height() - 60
            },
            android: {
                height: device.height() - 40,
            }
        }),
        position: 'absolute',
        zIndex: 9,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
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

module.exports = {CityPicker, cityUtil}