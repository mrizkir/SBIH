import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailMasyMiskin from '../sosial/masyMiskin/DetailMasyMiskin'
import GrafikMasyMiskin from '../sosial/masyMiskin/GrafikMasyMiskin'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Tingkat Kemiskinan"
        component={DetailMasyMiskin}
        initialParams={{ title: "Tingkat Kemiskinan" }}
      />
      <Tab.Screen
        name="Grafik Tingkat Kemiskinan"
        component={GrafikMasyMiskin}
        initialParams={{ title: "Tingkat Kemiskinan" }}
      />
    </Tab.Navigator>
  )
}

export default DetailDashboard
