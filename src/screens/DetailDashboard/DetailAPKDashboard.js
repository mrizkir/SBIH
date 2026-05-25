import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAPK from '../sosial/APK/DetailAPK'
import GrafikAPK from '../sosial/APK/GrafikAPK'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailAPKDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Angka Partisipasi Kasar"
        component={DetailAPK}
        initialParams={{ title: "Data Angka Partisipasi Kasar" }}
      />
      <Tab.Screen
        name="Grafik Angka Partisipasi Kasar"
        component={GrafikAPK}
        initialParams={{ title: "Data Angka Partisipasi Kasar" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAPKDashboard
