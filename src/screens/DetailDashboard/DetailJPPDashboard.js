import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJPP from '../pertanian/JPP/DetailJPP'
import GrafikJPP from '../pertanian/JPP/GrafikJPP'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailJPPDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Jumlah Produksi Peternakan (JPP) "
        component={DetailJPP}
        initialParams={{ title: "Data Jumlah Produksi Peternakan (Ton) " }}
      />
      <Tab.Screen
        name="Grafik Jumlah Produksi Peternakan (JPP) "
        component={GrafikJPP}
        initialParams={{ title: "Data Jumlah Produksi Peternakan (Ton)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailJPPDashboard
