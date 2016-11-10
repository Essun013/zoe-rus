/**
 * Created by ianchen on 2016/10/24.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ListView, Alert, Platform} from 'react-native';
import {device, http, gps, rcache} from '../../common/util';
import {navPush} from '../Nav/Nav';
import {CityPicker, cityUtil} from '../CityPicker'

const hospitalCacheKey = {HOSPITAL_INFO: 'hospital_info'}
const hospitalUtil = {
    save(name) {
        rcache.put(hospitalCacheKey.HOSPITAL_INFO, JSON.stringify({name}))
    },
    get(callback) {
        rcache.get(hospitalCacheKey.HOSPITAL_INFO, (err, r) => {
            var _result = null;
            try {
                if (r)
                    _result = JSON.parse(r);
            } catch (e) {
            }
            callback(_result);
        });
    }
}

var cityInfo = {};
class Hospital extends Component {
    static propTypes = {
        callback: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            showMask: false,
            hospitalList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            cityName: null
        };

        // 缓存中获取个人保存的城市信息
        cityUtil.get((d) => {
            if (d) {
                this.queryHospital(d);
            } else {
                cityUtil.gps((d) => {
                    if (d) {
                        Alert.alert('当前城市', d.nation.name + ' ' + d.province.name + ' ' + d.city.name + ' ' + d.county.name);
                        this.queryHospital(d);
                    } else {
                        Alert.alert('Error', '定位失败');
                    }
                });
            }
        });
    }

    queryHospital(d) {
        cityInfo = d;
        http.apiPost('/kb/hospital/query', {region: cityInfo.city.id}, (data) => {
            if (data.code == 0)
                this.setState({hospitalList: this.state.hospitalList.cloneWithRows(data.data)})
        })
        this.setState({cityName: d.city.name})
    }

    chooseHospital(name) {
        cityUtil.save(cityInfo.nation, cityInfo.province, cityInfo.city, cityInfo.county);
        hospitalUtil.save(name);

        this.props.callback({...cityInfo, hospitalName: name});
        navPush.pop(this.props);
    }

    hospitalList(row) {
        return <TouchableOpacity style={styles.hospitalBotton} onPress={() => {
            this.chooseHospital(row.name)
        }}>
            <Text style={styles.masterTitle}>{row.name}</Text>
            <Text style={styles.auxiliaryTitle}>{row.address}</Text>
        </TouchableOpacity>
    }

    hideCityPicker(rel) {
        cityInfo = rel;
        this.setState({showMask: false, city: rel.city.name})
    }

    city() {
        if (this.state.showMask)
            return <CityPicker hide={this.hideCityPicker.bind(this)}/>
        else return null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <TouchableOpacity style={styles.locationBotton} onPress={() => {
                        this.setState({showMask: true})
                    }}>
                        <Image source={require('./img/location.png')} style={{width: 13, height: 18, marginRight: 10}}
                               resizeMode='stretch'/>
                        <Text style={{fontSize: 14}}>{this.state.cityName}</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.searchHospital} placeholder={'请输入医院名称'}
                               placeholderTextColor={'rgb(146,146,146)'} underlineColorAndroid={'transparent'}/>
                </View>

                <ListView style={styles.hospitalView} dataSource={this.state.hospitalList} enableEmptySections={true}
                          renderRow={(row) => this.hospitalList(row)}/>

                {this.city()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: device.height() - 50,
        ...Platform.select({
            ios: {
                height: device.height() - 60
            }
        }),
        backgroundColor: '#fff'
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

module.exports = {Hospital, hospitalUtil};