import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJPBKU from '../kependudukan/JPBKU/DetailJPBKU'
import GrafikJPBKU from '../kependudukan/JPBKU/GrafikJPBKU'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailJPBKUDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) "
        component={DetailJPBKU}
        initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) " }}
      />
      <Tab.Screen
        name="Grafik Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) "
        component={GrafikJPBKU}
        initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kelompok Umur (JPBKU) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailJPBKUDashboard
