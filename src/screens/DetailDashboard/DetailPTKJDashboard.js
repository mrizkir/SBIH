import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPTKJ from '../infrastruktur/PTKJ/DetailPTKJ'
import GrafikPTKJ from '../infrastruktur/PTKJ/GrafikPTKJ'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPTKJDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Persentase Tingkat Kemantapan Jalan (PTKJ) "
        component={DetailPTKJ}
        initialParams={{ title: "Data Persentase Tingkat Kemantapan Jalan (PTKJ) " }}
      />
      <Tab.Screen
        name="Grafik Persentase Tingkat Kemantapan Jalan (PTKJ) "
        component={GrafikPTKJ}
        initialParams={{ title: "Data Persentase Tingkat Kemantapan Jalan (PTKJ) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailPTKJDashboard
