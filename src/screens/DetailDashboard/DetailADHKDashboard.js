import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMutation } from 'react-query';

import DetailADHK from '../ekonomi/ADHK/DetailADHK';
import GrafikADHK from '../ekonomi/ADHK/GrafikADHK';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton';

const Tab = createMaterialTopTabNavigator();

const DetailADHKDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Atas Dasar Harga Konstan"
        component={DetailADHK}
        initialParams={{ title: "PDRB ADHK (Juta Rupiah)" }}
      />
      <Tab.Screen
        name="Grafik Atas Dasar Harga Konstan"
        component={GrafikADHK}
        initialParams={{ title: "PDRB ADHK (Juta Rupiah)" }}
      />
    </Tab.Navigator>
  );
};


export default DetailADHKDashboard