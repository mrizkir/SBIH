import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMutation } from 'react-query';

import DetailADHB from '../ekonomi/ADHB/DetailADHB';
import GrafikADHB from '../ekonomi/ADHB/GrafikADHB';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton';

const Tab = createMaterialTopTabNavigator();

const DetailADHBDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Atas Dasar Harga Berlaku"
        component={DetailADHB}
        initialParams={{ title: "PDRB ADHB (Juta Rupiah)" }}
      />
      <Tab.Screen
        name="Grafik Atas Dasar Harga Berlaku"
        component={GrafikADHB}
        initialParams={{ title: "PDRB ADHB (Juta Rupiah)" }}
      />
    </Tab.Navigator>
  );
};


export default DetailADHBDashboard