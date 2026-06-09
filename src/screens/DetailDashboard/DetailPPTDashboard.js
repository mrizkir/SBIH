import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPT from '../pertanian/PPT/DetailPPT'
import GrafikPPT from '../pertanian/PPT/GrafikPPT'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPPTDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Produksi Perikanan Tangkap"
        component={DetailPPT}
        initialParams={{ title: "Data Produksi Perikanan Tangkap (Ton)" }}
      />
      <Tab.Screen
        name="Grafik Produksi Perikanan Tangkap"
        component={GrafikPPT}
        initialParams={{ title: "Data Produksi Perikanan Tangkap (Ton)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPTDashboard
