import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAPM from '../sosial/APM/DetailAPM'
import GrafikAPM from '../sosial/APM/GrafikAPM'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailAPMDashboard = (props) => {

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
        name="Detail Angka Partisipasi Murni"
        component={DetailAPM}
        initialParams={{ title: "Data Angka Partisipasi Murni" }}
      />
      <Tab.Screen
        name="Grafik Angka Partisipasi Murni"
        component={GrafikAPM}
        initialParams={{ title: "Data Angka Partisipasi Murni" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAPMDashboard
