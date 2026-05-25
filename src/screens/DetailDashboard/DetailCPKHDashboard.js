import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailCPKH from '../pertanian/CPKH/DetailCPKH'
import GrafikCPKH from '../pertanian/CPKH/GrafikCPKH'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailCPKHDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Capaian Produksi Komoditi Hortikultura "
        component={DetailCPKH}
        initialParams={{ title: "Data Produktivitas Komoditas Hortikultura (Ton/ha)" }}
      />
      <Tab.Screen
        name="Grafik Produktivitas Komoditas Hortikultura"
        component={GrafikCPKH}
        initialParams={{ title: "Data Produktivitas KomoditiasHortikultura (Ton/ha)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailCPKHDashboard
