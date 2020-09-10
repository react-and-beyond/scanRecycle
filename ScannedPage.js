import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

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
    </View>
  );
}
