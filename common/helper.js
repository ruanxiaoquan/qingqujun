import React, { Component } from 'react';
import {
    PixelRatio,
} from 'react-native';
import config from '../config';

export default {
    random() {
        return parseInt(Math.random() * 100000000);
    },
    getConifgItem: function (key) {
        if (config.isDev) {
            return config.dev[key];
        }
        return config.production[key];
    },
    getUrl: function (key, path) {
        if (config.isDev) {
            return `${config.dev[key]}${path}`;
        }
        return `${config.production[key]}${path}`;
    },
    onePix: 1 / PixelRatio.get(),
    log(tag, msg) {
        var len = arguments.length;
        if (config.isLog) {
            if (len > 1)
                console.log(tag, msg);
            if (len == 1)
                console.log(arguments[0]);
        }
    }
}