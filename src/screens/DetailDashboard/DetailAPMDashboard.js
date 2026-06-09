import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAPM from '../sosial/APM/DetailAPM'
import GrafikAPM from '../sosial/APM/GrafikAPM'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailAPMDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Angka Partisipasi Murni"
        component={DetailAPM}
        initialParams={{ title: "Data Angka Partisipasi Murni" }}
      />
      <Tab.Screen
        name="Grafik Angka Partisipasi Murni"
        component={GrafikAPM}
        initialParams={{ title: "Data Angka Partisipasi Murni" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAPMDashboard
