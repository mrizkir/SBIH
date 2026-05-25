import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIDB from '../sosial/IDB/DetailIDB'
import GrafikIDB from '../sosial/IDB/GrafikIDB'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {
  
  return (
    <Tab.Navigator
    screenOptions={materialTopTabScreenOptions}
    >
        <Tab.Screen 
        name="Detail Indeks Daya Beli" 
        component={DetailIDB} 
        initialParams={{  title: "Indeks Daya Beli" }}
        />
        <Tab.Screen 
        name="Grafik Indeks Daya Beli" 
        component={GrafikIDB} 
        initialParams={{  title: "Indeks Daya Beli" }}
        />
    </Tab.Navigator>
  )
}

export default DetailDashboard
