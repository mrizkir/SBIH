import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIPG from '../sosial/IPG/DetailIPG'
import GrafikIPG from '../sosial/IPG/GrafikIPG'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailIPGDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Indeks Pembangunan Gender"
        component={DetailIPG}
        initialParams={{ title: "Data Indeks Pembangunan Gender" }}
      />
      <Tab.Screen
        name="Grafik Indeks Pembangunan Gender"
        component={GrafikIPG}
        initialParams={{ title: "Data Indeks Pembangunan Gender" }}
      />
    </Tab.Navigator>
  )
}

export default DetailIPGDashboard
