import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJP from '../kependudukan/JP/DetailJP'
import GrafikJP from '../kependudukan/JP/GrafikJP'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailJPDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Jumlah Penduduk (JP) "
        component={DetailJP}
        initialParams={{ title: "Data Jumlah Penduduk (JP) " }}
      />
      <Tab.Screen
        name="Grafik Jumlah Penduduk (JP) "
        component={GrafikJP}
        initialParams={{ title: "Data Jumlah Penduduk (JP) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailJPDashboard
