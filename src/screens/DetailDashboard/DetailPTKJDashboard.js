import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPTKJ from '../infrastruktur/PTKJ/DetailPTKJ'
import GrafikPTKJ from '../infrastruktur/PTKJ/GrafikPTKJ'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPTKJDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Tingkat Kemantapan Jalan"
        component={DetailPTKJ}
        initialParams={{ title: "Tingkat Kemantapan Jalan" }}
      />
      <Tab.Screen
        name="Grafik Tingkat Kemantapan Jalan"
        component={GrafikPTKJ}
        initialParams={{ title: "Tingkat Kemantapan Jalan" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPTKJDashboard
