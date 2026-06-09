import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIPGG from '../sosial/IPGG/DetailIPGG'
import GrafikIPGG from '../sosial/IPGG/GrafikIPGG'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailIPGGDashboard = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Indeks Pemberdayaan Gender"
        component={DetailIPGG}
        initialParams={{ title: "Data Indeks Pemberdayaan Gender" }}
      />
      <Tab.Screen
        name="Grafik Indeks Pemberdayaan Gender"
        component={GrafikIPGG}
        initialParams={{ title: "Data Indeks Pemberdayaan Gender" }}
      />
    </Tab.Navigator>
  )
}

export default DetailIPGGDashboard
