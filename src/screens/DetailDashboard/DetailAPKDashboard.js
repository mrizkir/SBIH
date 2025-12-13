import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAPK from '../sosial/APK/DetailAPK'
import GrafikAPK from '../sosial/APK/GrafikAPK'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailAPKDashboard = (props) => {

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
        name="Detail Angka Partisipasi Kasar"
        component={DetailAPK}
        initialParams={{ title: "Data Angka Partisipasi Kasar" }}
      />
      <Tab.Screen
        name="Grafik Angka Partisipasi Kasar"
        component={GrafikAPK}
        initialParams={{ title: "Data Angka Partisipasi Kasar" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAPKDashboard
