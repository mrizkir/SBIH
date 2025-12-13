import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAKIM from '../sosial/AKIM/DetailAKIM'
import GrafikAKIM from '../sosial/AKIM/GrafikAKIM'
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator()

const DetailAKIMDashboard = (props) => {

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
        name="Detail Angka Kematian Ibu Melahirkan"
        component={DetailAKIM}
        initialParams={{ title: "Data Angka Kematian Ibu Melahirkan \n per 100.000 kelahiran hidup" }}
      />
      <Tab.Screen
        name="Grafik Angka Kematian Ibu Melahirkan"
        component={GrafikAKIM}
        initialParams={{ title: "Data Angka Kematian Ibu Melahirkan \n per 100.000 kelahiran hidup" }}
      />
    </Tab.Navigator>
  )
}

export default DetailAKIMDashboard
