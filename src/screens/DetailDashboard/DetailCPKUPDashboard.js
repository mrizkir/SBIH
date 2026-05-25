import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailCPKUP from '../pertanian/CPKUP/DetailCPKUP'
import GrafikCPKUP from '../pertanian/CPKUP/GrafikCPKUP'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailCPKUPDashboard = (props) => {

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
        name="Detail Produktivitas Komoditas Unggulan Perkebunan"
        component={DetailCPKUP}
        initialParams={{ title: "Data Produktivitas Komoditas Unggulan Perkebunan (Ton/ha)" }}
      />
      <Tab.Screen
        name="Grafik Produktivitas Komoditas Unggulan Perkebunan"
        component={GrafikCPKUP}
        initialParams={{ title: "Data Produktivitas Komoditas Unggulan Perkebunan (Ton/ha)" }}
      />
    </Tab.Navigator>
  )
}

export default DetailCPKUPDashboard
