import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Scan from './ScanPage';
import styled from 'styled-components/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faBarcode } from '@fortawesome/free-solid-svg-icons'

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
const ButtonLink = styled.View`
  background-color: #8fbc8f;
  border: 1px solid #699e69;
  flex-grow: 1;
`
const NavigationText = styled.Text`
  color: red;
`
const NavigationWrap = styled.View`
  flex-direction: row;
`
export default function App() {
  return (
    <NativeRouter>
      <AppWrapper>
        <PageWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/scan" component={Scan} />
        </PageWrapper>
        <NavigationWrap>
          <ButtonLink>
            <Link to="/" underlayColor="#699e69" >
              <NavigationText><FontAwesomeIcon icon={ faHome } />Home</NavigationText>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link to="/scan" underlayColor="#699e69">
              <NavigationText><FontAwesomeIcon icon={ faBarcode } />Scan</NavigationText>
            </Link>
          </ButtonLink>
        </NavigationWrap>
      </AppWrapper>
    </NativeRouter>
  );
}
