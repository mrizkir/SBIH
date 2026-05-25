import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPS from '../sosial/PS/DetailPS'
import GrafikPS from '../sosial/PS/GrafikPS'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPSDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={materialTopTabScreenOptions}
    >
      <Tab.Screen
        name="Detail Privalensi Stunting "
        component={DetailPS}
        initialParams={{ title: "Data Privalensi Stunting " }}
      />
      <Tab.Screen
        name="Grafik Privalensi Stunting "
        component={GrafikPS}
        initialParams={{ title: "Data Privalensi Stunting " }}
      />
    </Tab.Navigator>
  )
}

export default DetailPSDashboard