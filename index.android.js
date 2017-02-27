/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import App from "./app";
global.__TYPE__ = "android";

StatusBar.setHidden(false);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor("transparent");

AppRegistry.registerComponent('qingqujun', () => App);
