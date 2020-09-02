import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(data);
    console.log(data.toString());
    setTimeout(function(){
      setScanned(null);
    }, 10000);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      { !!scanned && <><Text>{`${scanned}`}</Text><Button title={'Tap to Scan Again'} onPress={() => setScanned(null)} /></>}
    </View>
  );
}
