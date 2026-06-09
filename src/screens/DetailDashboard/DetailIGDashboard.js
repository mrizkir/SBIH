import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailIG from '../sosial/IG/DetailIG'
import GrafikIG from '../sosial/IG/GrafikIG'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailDashboard = (props) => {  
  return (
    <Tab.Navigator
    screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
        <Tab.Screen 
        name="Detail Indeks Gini" 
        component={DetailIG} 
        initialParams={{ title: 'Indeks Gini' }}
        />
        <Tab.Screen 
        name="Grafik Indeks Gini" 
        component={GrafikIG} 
        initialParams={{title: 'Indeks Gini' }}
        />
    </Tab.Navigator>
  )
}

export default DetailDashboard
