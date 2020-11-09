import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, Button, Modal, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const ScanPageWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`
const StyledView = styled.View`
  background-color: #fff;
  margin: 20px;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
`
const CustomTextInput = styled.TextInput`
  width: 100%;
  border-color: gray;
  border-width: 1px;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`

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
    setTimeout(function(){
      setScanned(null);
    }, 5000000);
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function BarcodeChecker({barcode}) {
    const firebaseCollection = firebase.firestore().collection('scan').where('barcode', '==', barcode);
    const [doc, setDoc] = useState(null);
    const [nameBarcode, setNameBarcode] = useState('');

    async function addScann() {
      const today = new Date();
      const date = today.getFullYear() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getDate();
      const scanns = firebase.firestore().collection('scan');
      const scan = scanns.doc(nameBarcode.toString());
      const data = await scan.set({
        name: nameBarcode,
        barcode: scanned,
        createdAt: date
      })
      .then(function(){
        console.warn('Document successfully added!');
        setScanned(null);
      })
      .catch(function(error){
        console.warn('Error added document: ', error);
      })
    }

    useEffect(() => {
      (async() => {
        try{
          const doc = await firebaseCollection.get();
          setDoc(doc);
        }catch(error){
          console.warn("Error getting document:", error);
        }
      })();
    }, []);
    return doc?.size ? (

      <StyledView>
        <Text>Exist in firebase</Text>
        <Text>Title doc</Text>
        <CustomTextInput
          value={barcode}
          editable={false}
        />
        <Text>Name doc</Text>
        <CustomTextInput
          value="value"
          placeholder="placeholder"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Button
            color="#209d7e"
            title={'Cancel'}
            onPress={() => setScanned(null)}
          />
          <Button
            color="#ede331"
            title={'Update product'}
            onPress={() => updateScann()}
          />
        </View>
      </StyledView>
    ):(
      <StyledView>
        <Text>Not exist in firebase</Text>
        <CustomTextInput
        value={scanned}
        editable={false}
        />
        <CustomTextInput
          placeholder="Insert name"
          onChangeText={setNameBarcode}
          value={nameBarcode}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Button
            color="#209d7e"
            title={'Cancel'}
            onPress={() => setScanned(null)}
          />
          <Button
            color="#6cbc1b"
            title={'Save'}
            onPress={() => addScann()}/>
        </View>
      </StyledView>
    )
  }

  return (
    <ScanPageWrapper>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Modal
        visible={!!scanned}
        transparent={true}
        >
          <BarcodeChecker barcode={scanned} />
      </Modal>
    </ScanPageWrapper>
  );
}
