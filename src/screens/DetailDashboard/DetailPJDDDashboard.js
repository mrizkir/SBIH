import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPJDD from '../infrastruktur/pjdd/DetailPJDD'
import GrafikPJDD from '../infrastruktur/pjdd/GrafikPJDD'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailPJDDDashboard = (props) => {
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
        name="Detail Panjang Jalan yang Dibangun dan Ditingkatkan" 
        component={DetailPJDD} 
        initialParams={{  title: "Panjang Jalan Dibangun" }}
        />
        <Tab.Screen 
        name="Grafik PanjangnJalan yang Dibangun dan Ditingkatkan" 
        component={GrafikPJDD} 
        initialParams={{  title: "Panjang Jalan Dibangun" }}
        />
    </Tab.Navigator>
  )
}

export default DetailPJDDDashboard
