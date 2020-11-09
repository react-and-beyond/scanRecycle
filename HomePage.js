import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import styled from 'styled-components/native'

const HomeWrapper = styled.View`
  flex: 1;
  justify-content: center;
`
const HeadingHome = styled.Text`
  font-weight: 800;
  font-size: 32px;
  text-align: center;
`
const AppNameText = styled.Text`
  color: #209dd7;
  font-weight: bold;
`
const SubHeading = styled.Text`
  text-align: center;
  font-size: 22px;
`

export default function Home() {
  return (
    <HomeWrapper>
      <HeadingHome>Hello,</HeadingHome>
      <SubHeading>I am <AppNameText>which-recycle-bin</AppNameText> app.</SubHeading>
    </HomeWrapper>
  );
}
