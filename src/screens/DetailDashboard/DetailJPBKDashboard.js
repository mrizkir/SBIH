import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailJPBK from '../kependudukan/JPBK/DetailJPBK'
import GrafikJPBK from '../kependudukan/JPBK/GrafikJPBK'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailJPBKDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0074BD',
        tabBarInactiveTintColor: '#979797',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
        },
        tabBarButton: safeTabBarButton,
      }}
    >
      <Tab.Screen
        name="Detail Jumlah Penduduk Berdasarkan Kecamatan (JPBK) "
        component={DetailJPBK}
        initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kecamatan (JPBK) " }}
      />
      <Tab.Screen
        name="Grafik Jumlah Penduduk Berdasarkan Kecamatan (JPBK) "
        component={GrafikJPBK}
        initialParams={{ title: "Data Jumlah Penduduk Berdasarkan Kecamatan (JPBK) " }}
      />
    </Tab.Navigator>
  )
}

export default DetailJPBKDashboard
