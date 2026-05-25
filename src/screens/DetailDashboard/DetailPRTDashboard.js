import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPRT from '../infrastruktur/prt/DetailPRT';
import GrafikPRT from '../infrastruktur/prt/GrafikPRT';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPRTDashboard = (props) => {
  return (
    <Tab.Navigator
    screenOptions={materialTopTabScreenOptions}
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
