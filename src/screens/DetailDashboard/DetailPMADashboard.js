import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPMA from '../ekonomi/PMA/DetailPMA'
import GrafikPMA from '../ekonomi/PMA/GrafikPMA'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPMADashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Realisasi Investasi)"
        component={DetailPMA}
        initialParams={{ title: "Data Realisasi Investasi" }}
      />
      <Tab.Screen
        name="Grafik Realisasi Investasi"
        component={GrafikPMA}
        initialParams={{ title: "Data Realisasi Investasi" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPMADashboard
