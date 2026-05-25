import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJRTLH from '../sosial/JRTLH/DetailJRTLH'
import GrafikJRTLH from '../sosial/JRTLH/GrafikJRTLH'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailJRTLHDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Jumlah Rumah Tidak Layak Huni Yang Direhab"
        component={DetailJRTLH}
        initialParams={{ title: "Data Jumlah Rumah Tidak Layak Huni Yang Direhab" }}
      />
      <Tab.Screen
        name="Grafik Jumlah Rumah Tidak Layak Huni Yang Direhab"
        component={GrafikJRTLH}
        initialParams={{ title: "Data Jumlah Rumah Tidak Layak Huni Yang Direhab" }}
      />
    </Tab.Navigator>
  )
}

export default DetailJRTLHDashboard
