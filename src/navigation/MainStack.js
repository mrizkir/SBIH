import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerMenuButton from '../components/DrawerMenuButton';
import Dashboard from '../screens/dashboard/Index';
import TentangKami from '../screens/dashboard/TentangKami';
import DetailDashboard from '../screens/DetailDashboard/DetailDashboard';
import DetailIPMDashboard from '../screens/DetailDashboard/DetailIPMDashboard';
import DetailRLSDashboard from '../screens/DetailDashboard/DetailRLSDashboard';
import DetailIGDashboard from '../screens/DetailDashboard/DetailIGDashboard';
import DetailIDBDashboard from '../screens/DetailDashboard/DetailIDBDashboard';
import DetailPEDashboard from '../screens/DetailDashboard/DetailPEDashboard';
import DetailKWDashboard from '../screens/DetailDashboard/DetailKWDashboard';
import DetailPPDashboard from '../screens/DetailDashboard/DetailPPDashboard';
import DetailPJDDDashboard from '../screens/DetailDashboard/DetailPJDDDashboard';
import DetailPRTDashboard from '../screens/DetailDashboard/DetailPRTDashboard';
import DetailAMHDashboard from '../screens/DetailDashboard/DetailAMHDashboard';
import DetailAHHDashboard from '../screens/DetailDashboard/DetailAHHDashboard';
import DetailAKHBDashboard from '../screens/DetailDashboard/DetailAKHBDashboard';
import DetailAKIMDashboard from '../screens/DetailDashboard/DetailAKIMDashboard';
import DetailPKKDashboard from '../screens/DetailDashboard/DetailPKKDashboard';
import DetailIPGDashboard from '../screens/DetailDashboard/DetailIPGDashboard';
import DetailAPKDashboard from '../screens/DetailDashboard/DetailAPKDashboard';
import DetailAPmDashboard from '../screens/DetailDashboard/DetailAPMDashboard';
import DetailHLSDashboard from '../screens/DetailDashboard/DetailHLSDashboard';
import DetailJRTLHDashboard from '../screens/DetailDashboard/detailJRTLHDashboard';
import DetailPPUDashboard from '../screens/DetailDashboard/DetailPPUDashboard';
import DetailIPGGDashboard from '../screens/DetailDashboard/DetailIPGGDashboard';
import DetailLIDashboard from '../screens/DetailDashboard/DetailLIDashboard';
import DetailPMADashboard from '../screens/DetailDashboard/DetailPMADashboard';
import DetailPPBDashboard from '../screens/DetailDashboard/DetailPPBDashboard';
import DetailPPTDashboard from '../screens/DetailDashboard/DetailPPTDashboard';
import DetailCPKUPDashboard from '../screens/DetailDashboard/DetailCPKUPDashboard';
import DetailCPKHDashboard from '../screens/DetailDashboard/DetailCPKHDashboard';
import DetailJPPDashboard from '../screens/DetailDashboard/DetailJPPDashboard';
import DetailJPDashboard from '../screens/DetailDashboard/DetailJPDashboard';
import DetailJPBKDashboard from '../screens/DetailDashboard/DetailJPBKDashboard';
import DetailJPBKUDashboard from '../screens/DetailDashboard/DetailJPBKUDashboard';
import DetailPTKJDashboard from '../screens/DetailDashboard/DetailPTKJDashboard';
import DetailVideoDashboard from '../screens/DetailDashboard/DetailVideoDashboard';
import DashboardAnggaranMurni from '../screens/e-money/DashboardAnggaranMurni';
import DetailADHBDashboard from '../screens/DetailDashboard/DetailADHBDashboard';
import DetailADHKDashboard from '../screens/DetailDashboard/DetailADHKDashboard';
import DetailPSDashboard from '../screens/DetailDashboard/DetailPSDashboard';

const Stack = createStackNavigator();

const APP_HEADER_TITLE = 'Smart Bintan in Hands';

const screenWithMenuOptions = {
  headerShown: true,
  headerTitle: APP_HEADER_TITLE,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#0074BD',
    fontWeight: '700',
    fontSize: 16,
  },
  headerShadowVisible: false,
  headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
  headerLeft: () => <DrawerMenuButton />,
};

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="TentangKami" component={TentangKami} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailDashboard" component={DetailDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailIPMDashboard" component={DetailIPMDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailRLSDashboard" component={DetailRLSDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailIGDashboard" component={DetailIGDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailIDBDashboard" component={DetailIDBDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPEDashboard" component={DetailPEDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailKWDashboard" component={DetailKWDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPPDashboard" component={DetailPPDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPJDDDashboard" component={DetailPJDDDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPRTDashboard" component={DetailPRTDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAMHDashboard" component={DetailAMHDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAHHDashboard" component={DetailAHHDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAKHBDashboard" component={DetailAKHBDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAKIMDashboard" component={DetailAKIMDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPKKDashboard" component={DetailPKKDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailIPGDashboard" component={DetailIPGDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAPKDashboard" component={DetailAPKDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailAPMDashboard" component={DetailAPmDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailHLSDashboard" component={DetailHLSDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailJRTLHDashboard" component={DetailJRTLHDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPPUDashboard" component={DetailPPUDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailIPGGDashboard" component={DetailIPGGDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailLIDashboard" component={DetailLIDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPMADashboard" component={DetailPMADashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPPBDashboard" component={DetailPPBDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPPTDashboard" component={DetailPPTDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailCPKUPDashboard" component={DetailCPKUPDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailCPKHDashboard" component={DetailCPKHDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailJPPDashboard" component={DetailJPPDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailJPDashboard" component={DetailJPDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailJPBKDashboard" component={DetailJPBKDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailJPBKUDashboard" component={DetailJPBKUDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPTKJDashboard" component={DetailPTKJDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailVideoDashboard" component={DetailVideoDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DashboardAnggaranMurni" component={DashboardAnggaranMurni} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailADHBDashboard" component={DetailADHBDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailADHKDashboard" component={DetailADHKDashboard} options={screenWithMenuOptions} />
    <Stack.Screen name="DetailPSDashboard" component={DetailPSDashboard} options={screenWithMenuOptions} />
  </Stack.Navigator>
);

export default MainStack;
