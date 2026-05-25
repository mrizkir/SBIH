import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPP from '../kependudukan/PP/DetailPP'
import GrafikPP from '../kependudukan/PP/GrafikPP'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPPDashboard = (props) => {
  return (
    <Tab.Navigator
    screenOptions={materialTopTabScreenOptions}
    >
        <Tab.Screen 
        name="Detail Pertumbuhan Penduduk" 
        component={DetailPP} 
        initialParams={{  title: "Data Pertumbuhan Penduduk" }}
        />
        <Tab.Screen 
        name="Grafik Pertumbuhan Penduduk" 
        component={GrafikPP} 
        initialParams={{  title: "Data Pertumbuhan Penduduk" }}
        />
    </Tab.Navigator>
  )
}

export default DetailPPDashboard
