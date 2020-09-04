import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Scan from './ScanPage';
import styled from 'styled-components/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faBarcode, faUser } from '@fortawesome/free-solid-svg-icons'

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
      <AppWrapper>
        <PageWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/scan" component={Scan} />
        </PageWrapper>
        <NavigationWrap>
          <ButtonLink>
            <Link to="/" underlayColor="#699e69" >
              <NavigationText><FontAwesomeIcon icon={ faHome } size={ 28 } color="white" />{"\n"}Home</NavigationText>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link to="/scan" underlayColor="#699e69">
              <NavigationText><FontAwesomeIcon icon={ faBarcode } size={ 28 } color="white" />{"\n"}Scan</NavigationText>
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
