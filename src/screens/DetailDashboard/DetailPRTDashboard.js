import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPRT from '../infrastruktur/prt/DetailPRT';
import GrafikPRT from '../infrastruktur/prt/GrafikPRT';
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailPRTDashboard = (props) => {
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
        name="Detail Penggunaan Air Bersih" 
        component={DetailPRT} 
        initialParams={{  title: "Persentase Penggunaan Air Bersih" }}
        />
        <Tab.Screen 
        name="Grafik Penggunaan Air Bersih" 
        component={GrafikPRT} 
        initialParams={{  title: "Persentase Penggunaan Air Bersih" }}
        />
    </Tab.Navigator>
  )
}

export default DetailPRTDashboard
