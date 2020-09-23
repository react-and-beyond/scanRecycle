import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, Button, View,  TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// async function readScann() {
//   console.warn('readScann is called !!!');
//   const scanns = firebase.firestore().collection('scan');
//   scanns.get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       console.warn(doc.id, " => ", doc.data());
//     });
//   })
// }

function Scans() {
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const scaned = firebase.firestore()
      .collection('scan')
      .get()
      .then(querySnapshot => {
        const scans = [];
        // console.warn('querySnapshot: ',querySnapshot);
        querySnapshot.forEach(documentSnapshot => {
          scans.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        // console.warn('scans', scans)
        setScans(scans);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  console.warn('scans',scans)
  return (
    <FlatList
      data={scans}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>ID: {item.id}</Text>
          <Text>Name {item.name}</Text>
          <Text>Barcode: {item.barcode}</Text>
        </View>
      )}
    />
  );
}

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
      <Scans/>
    </View>
  );
}
