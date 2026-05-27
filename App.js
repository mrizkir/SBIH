import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerContent from './src/components/DrawerContent'
import MainStack from './src/navigation/MainStack'
import { MAIN_STACK_ROUTE } from './src/navigation/navigationRef'

const Drawer = createDrawerNavigator()

const queryClient = new QueryClient()

const AppNavigator = () => (
  <Drawer.Navigator
    initialRouteName={MAIN_STACK_ROUTE}
    drawerPosition="left"
    screenOptions={{ headerShown: false }}
    drawerContent={() => (
      <DrawerContentScrollView>
        <DrawerContent />
      </DrawerContentScrollView>
    )}
  >
    <Drawer.Screen name={MAIN_STACK_ROUTE} component={MainStack} />
  </Drawer.Navigator>
)

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default App
