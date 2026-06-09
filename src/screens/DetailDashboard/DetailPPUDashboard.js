import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DetailPPU from '../sosial/PPU/DetailPPU'
import GrafikPPU from '../sosial/PPU/GrafikPPU'
import { materialTopTabScreenOptions } from '../../components/SafeTabBarButton'
const Tab = createMaterialTopTabNavigator()

const DetailPPUDashboard = (props) => {

  return (
    <Tab.Navigator
      screenOptions={{ ...materialTopTabScreenOptions, lazy: true }}
    >
      <Tab.Screen
        name="Detail Persentase penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan"
        component={DetailPPU}
        initialParams={{ title: "Data Persentase penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan" }}
      />
      <Tab.Screen
        name="Grafik Persentase penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan"
        component={GrafikPPU}
        initialParams={{ title: "Data Persentase penduduk Usia 15 Tahun Ke Atas Menurut Pendidikan yang Di Tamatkan" }}
      />
    </Tab.Navigator>
  )
}

export default DetailPPUDashboard
