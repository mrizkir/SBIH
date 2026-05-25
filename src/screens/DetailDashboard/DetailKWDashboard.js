import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailKW from '../ekonomi/KW/DetailKW';
import GrafikKW from '../ekonomi/KW/GrafikKW';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailKWDashboard = (props) => {
  return (
    <Tab.Navigator
    screenOptions={materialTopTabScreenOptions}
    >
        <Tab.Screen 
        name="Detail Kunjungan Wisata" 
        component={DetailKW} 
        initialParams={{  title: "Kunjungan Wisata" }}
        />
        <Tab.Screen 
        name="Grafik Kunjungan Wisata" 
        component={GrafikKW} 
        initialParams={{  title: "Kunjungan Wisata" }}
        />
    </Tab.Navigator>
  )
}

export default DetailKWDashboard
