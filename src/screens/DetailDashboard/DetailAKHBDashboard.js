import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAKHB from '../sosial/AKHB/DetailAKHB';
import GrafikAKHB from '../sosial/AKHB/GrafikAKHB';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton';

const Tab = createMaterialTopTabNavigator();

const DetailAKHBDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Angka Keberlangsungan Hidup Bayi"
        component={DetailAKHB}
        initialParams={{ title: "Data Angka Keberlangsungan Hidup Bayi"}}
      />
      <Tab.Screen
        name="Grafik Angka Keberlangsungan Hidup Bayi"
        component={GrafikAKHB}
        initialParams={{ title: "Data Angka Keberlangsungan Hidup Bayi"}}
      />
    </Tab.Navigator>
  );
};

export default DetailAKHBDashboard;
