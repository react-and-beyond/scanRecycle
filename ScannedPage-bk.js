import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, Button, View, TouchableOpacity, StyleSheet } from 'react-native';
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
const ViewItem = styled.View`
  border-radius: 8px;
  border: 1px solid rgba(32, 157, 215, 1);
  margin: 8px auto;
  padding: 12px;
  width: 90%;
`
const ItemText = styled.Text`
  text-align: left;
`
function Scans() {
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <ViewItem>
        <ItemText>ID: <Text>{item.id}</Text></ItemText>
        <ItemText>Name: <Text>{item.name}</Text></ItemText>
        <ItemText>Barcode: <Text>{item.barcode}</Text></ItemText>
      </ViewItem>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.barcode === selectedBarcode ? "rgba(32, 157, 215, 1)" : "rgba(32, 157, 215, 0.4)";
    return (
      <Item
        item={item}
        onPress={() => setSelectedBarcode(item.barcode)}
        style={{backgroundColor}}
      />
    )
  }
  useEffect(() => {
    const scaned = firebase.firestore()
      .collection('scan')
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
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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
