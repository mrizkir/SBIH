import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPJDD from '../infrastruktur/pjdd/DetailPJDD'
import GrafikPJDD from '../infrastruktur/pjdd/GrafikPJDD'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPJDDDashboard = (props) => {
  return (
    <Tab.Navigator
    screenOptions={materialTopTabScreenOptions}
    >
        <Tab.Screen 
        name="Detail Panjang Jalan Dibangun" 
        component={DetailPJDD} 
        initialParams={{  title: "Panjang Jalan Dibangun" }}
        />
        <Tab.Screen 
        name="Grafik Panjang Jalan Dibangun" 
        component={GrafikPJDD} 
        initialParams={{  title: "Panjang Jalan Dibangun" }}
        />
    </Tab.Navigator>
  )
}

export default DetailPJDDDashboard
