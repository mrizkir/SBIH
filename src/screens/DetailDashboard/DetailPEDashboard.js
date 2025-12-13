import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';

import DetailPE from '../ekonomi/PE/DetailPE';
import GrafikPE from '../ekonomi/PE/GrafikPE';
import { safeTabBarButton } from '../../components/SafeTabBarButton'

const Tab = createMaterialTopTabNavigator();


const DetailPEDashboard = () => {
  return (
    <>
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
          name="Detail Pertumbuhan Ekonomi" 
          component={DetailPE} 
          initialParams={{ title: "Data Pertumbuhan Ekonomi" }}
        />
        <Tab.Screen 
          name="Grafik Pertumbuhan Ekonomi" 
          component={GrafikPE} 
          initialParams={{ title: "Data Pertumbuhan Ekonomi" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default DetailPEDashboard;
