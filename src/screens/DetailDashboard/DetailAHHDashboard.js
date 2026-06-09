import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailAHH from '../sosial/AHH/DetailAHH';
import GrafikAHH from '../sosial/AHH/GrafikAHH';
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton';

const Tab = createMaterialTopTabNavigator();

const DetailAHHDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Angka Harapan Hidup"
        component={DetailAHH}
        initialParams={{ title: "Data Angka Harapan Hidup" }}
      />
      <Tab.Screen
        name="Grafik Angka Harapan Hidup"
        component={GrafikAHH}
        initialParams={{ title: "Data Angka Harapan Hidup" }}
      />
    </Tab.Navigator>
  );
};

export default DetailAHHDashboard;
