import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPB from '../pertanian/PPB/DetailPPB'
import GrafikPPB from '../pertanian/PPB/GrafikPPB'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPPBDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Produksi Perikanan Budidaya (Ton)"
        component={DetailPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (Ton)" }}
      />
      <Tab.Screen
        name="Grafik Produksi Perikanan Budidaya (Ton)"
        component={GrafikPPB}
        initialParams={{ title: "Data Produksi Perikanan Budidaya (Ton)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPBDashboard
