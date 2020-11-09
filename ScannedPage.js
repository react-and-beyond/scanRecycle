import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, Button, View, TouchableOpacity } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import styled from 'styled-components/native'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const ScannedWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
`
const ViewItem = styled.TouchableOpacity`
  background-color: rgba(32, 157, 215, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(32, 157, 215, 1);
  margin: 8px auto;
  padding: 16px;
  width: 90%;
`
const ItemText = styled.Text`
  text-align: left;
  font-size: 16px;
`
function Scans() {
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const scaned = firebase.firestore()
      .collection('scan')
      .orderBy('createdAt', 'asc')
      .get()
      .then(querySnapshot => {
        const scans = [];
        querySnapshot.forEach(
            documentSnapshot => {
              scans.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            }
        );
        setScans(scans);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      data={scans}
      renderItem={({ item }) => (
        <ViewItem
          onPress={ () => console.warn(item.barcode) }
          >
          <ItemText>Name: <Text>{item.name}</Text></ItemText>
          <ItemText>Barcode: <Text>{item.barcode}</Text></ItemText>
          <ItemText>Created at: <Text>{item.createdAt}</Text></ItemText>
        </ViewItem>
      )}
    />
  );
}

export default function App() {

  return (
    <ScannedWrapper>
      <Scans/>
    </ScannedWrapper>
  );
}
