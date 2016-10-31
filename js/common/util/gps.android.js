/**
 * Created by ianchen on 2016/10/28.
 */

'use strict';
// 高德地图定位
import AMapLocation from 'react-native-amap-location';

var gps = {
    getLocation(callback, err?: (err: Object) => void) {
        AMapLocation.addEventListener((data) => {
            let d = {
                lat: data.latitude,
                lng: data.longitude,
                speed: data.speed,
                altitude: data.altitude,
                accuracy: data.accuracy
            };

            AMapLocation.stopLocation();

            callback(d);
        });
        AMapLocation.startLocation({
            accuracy: 'HighAccuracy',
            killProcess: true,
            needDetail: true,
            onceLocation: true,
            httpTimeOut: 1000 * 30
        });
    }
}

module.exports = gps;