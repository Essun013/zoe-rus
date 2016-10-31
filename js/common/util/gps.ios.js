/**
 * Created by ianchen on 2016/10/27.
 */

'use strict';
// React Native原生定位

var gps = {
    getLocation(callback, err?: (err: Object) => void) {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                let data = location.coords;
                let d = {
                    lat: data.latitude,
                    lng: data.longitude,
                    speed: data.speed,
                    altitude: data.altitude,
                    accuracy: data.accuracy,
                    heading: data.heading,
                    altitudeAccuracy: data.altitudeAccuracy
                };

                callback(d)
            },
            (error) => {
                err(error)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
}

module.exports = gps;