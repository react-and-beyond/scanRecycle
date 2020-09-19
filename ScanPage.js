import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'

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
    }, 9100000);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const Modal = styled.View`
    background-color: #f0f0f0;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 20px;
  `
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

      { !!scanned && <>
        <Modal>
          <Text>{`${scanned}`}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Button
              color="#22a3c4"
              title={'Scan again'}
              onPress={() => setScanned(null)}
            />
            <Button
              color="#6cbc1b"
              title={'Save'}
              onPress={() => setScanned(null)} />
          </View>
        </Modal>
      </>}
    </View>
  );
}
