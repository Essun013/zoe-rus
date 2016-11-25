/**
 * Created by ianchen on 2016/11/25.
 */

import React from 'react'
import {BackAndroid, ToastAndroid, Alert} from 'react-native';

var outAppNvg;

var outAppDateTime = new Date().getTime();

function androidBackLsn() {
    if (outAppNvg.getCurrentRoutes().length > 1) {
        outAppNvg.pop();
        return true;
    } else {
        if ((new Date().getTime() - outAppDateTime) <= (2 * 1000)) {
            BackAndroid.removeEventListener('hardwareBackPress', androidBackLsn);
            return false;
        }

        outAppDateTime = new Date().getTime();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }
}

const anbacklsn = {
    start: () => {
        try {
            BackAndroid.removeEventListener('hardwareBackPress', androidBackLsn);
        } catch (e) {}

        BackAndroid.addEventListener('hardwareBackPress', androidBackLsn);
    },

    setNvg: (nvg) => {
        outAppNvg = nvg;
    },
}

module.exports = anbacklsn;