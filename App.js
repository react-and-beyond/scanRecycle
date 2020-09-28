import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faQrcode, faTasks, faUser } from '@fortawesome/free-solid-svg-icons'

import Scan from './ScanPage';
import Scanned from './ScannedPage';

var firebaseConfig = {
  apiKey: "AIzaSyBkI5KMQt8CiMmZ1CU4FXIYQk78Lm8mxbs",
  authDomain: "which-recycle-bin.firebaseio.com",
  databaseURL: "https://which-recycle-bin.firebaseio.com",
  projectId: "which-recycle-bin",
  storageBucket: "which-recycle-bin.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:301278519748:android:7d09feb04b6a1984878491",
  measurementId: "G-measurement-id",
};

firebase.initializeApp(firebaseConfig);

async function test() {
  const scanns = firebase.firestore().collection('scan');
  const scan = scanns.doc('qKEbAHuUW7P8DUtLykIL');
  const data = await scan.get();
  if (data.exists) {
    console.log("Document data:", data.data());
  }else{
    console.log("No document");
  }
}
test();

const Home = () => {
  const PageWrapper = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    width: 100%;
  `
  return(
    <PageWrapper>
      <Text>Bun venit</Text>
      <Button
        color="darkseagreen"
        title="Scaneaza codul acum !"
      />
    </PageWrapper>
  )
};
const AppWrapper = styled.View`
  display: flex;
  flex-wrap: nowrap;
  background-color: #f0f0f0;
  height: 100%;
`
const PageWrapper = styled.View`
  background-color: rgba(255, 255, 255, 1);
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`
const NavigationWrap = styled.View`
  flex-direction: row;
`
const NavigationText = styled.Text`
  color: #fff;
  font-size: 12px;
  padding: 8px 6px 6px;
  text-align: center;
  flex-wrap: nowrap;
  text-transform: uppercase;
`
const ButtonLink = styled.View`
  background-color: #8fbc8f;
  flex-grow: 1;
`

export default function App() {
  return (
    <NativeRouter>
      <StatusBar hidden />
      <AppWrapper>
        <PageWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/scan" component={Scan} />
          <Route path="/scanned" component={Scanned} />
        </PageWrapper>
        <NavigationWrap>
          <ButtonLink>
            <Link to="/" underlayColor="#699e69" >
              <NavigationText><FontAwesomeIcon icon={ faHome } size={ 28 } color="white" />{"\n"}Home</NavigationText>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link to="/scan" underlayColor="#699e69">
              <NavigationText><FontAwesomeIcon icon={ faQrcode } size={ 28 } color="white" />{"\n"}Scan</NavigationText>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link to="/scanned" underlayColor="#699e69">
              <NavigationText><FontAwesomeIcon icon={ faTasks } size={ 28 } color="white" />{"\n"}Scanned</NavigationText>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link to="/scan" underlayColor="#699e69">
              <NavigationText><FontAwesomeIcon icon={ faUser } size={ 28 } color="white" />{"\n"}Contact</NavigationText>
            </Link>
          </ButtonLink>
        </NavigationWrap>
      </AppWrapper>
    </NativeRouter>
  );
}
