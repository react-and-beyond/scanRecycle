import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [nameBarcode, setNameBarcode] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(data);
    //console.warn(data.toString());
    setTimeout(function(){
      setScanned(null);
    }, 910000);
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

  async function addScann() {
    //console.warn('addScann is called !!!');
    const today = new Date();
    const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    const scanns = firebase.firestore().collection('scan');
    const scan = scanns.doc(nameBarcode.toString());
    const data = await scan.set({
      name: nameBarcode.toString(),
      barcode: scanned.toString(),
      createdAt: date.toString()
    })
    .then(function(){
      console.warn('Document successfully added!');
    })
    .catch(function(error){
      console.warn('Error added document: ', error);
    })
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

      { !!scanned && <>
        <Modal>
          <Text>Result after scan:</Text>
          <TextInput
            style={{ width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 5, margin: 5 }}
            onChangeText={barcode => setBarcode(barcode)}
            value={scanned}
            editable={false}
          />
          <TextInput
            style={{ width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 5, margin: 5 }}
            placeholder="Insert name"
            onChangeText={(nameBarcode) => setNameBarcode(nameBarcode)}
            defaultValue={nameBarcode}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Button
              color="#ede331"
              title={'Cancel'}
              onPress={() => setScanned(null)}
            />
            <Button
              color="#6cbc1b"
              title={'Save'}
              onPress={() => addScann()}/>
          </View>
        </Modal>
      </>}
    </View>
  );
}
