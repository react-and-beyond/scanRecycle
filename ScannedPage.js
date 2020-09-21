import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

async function readScann() {
  console.warn('readScann is called !!!');
  const scanns = firebase.firestore().collection('scan');
  scanns.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.warn(doc.id, " => ", doc.data());
    });
  })
}

export default function App() {

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Text style={{
        fontSize: 22,
        padding: 16
      }}>
        Here is page with results after scanned - returned by firebase.
      </Text>
      <Button
        title={'Show data'}
        onPress={() => readScann()}/>
    </View>
  );
}
