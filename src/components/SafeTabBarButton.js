import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TabBar, TabBarItem } from 'react-native-tab-view';

/**
 * Tab bar untuk Material Top Tabs — key dipisah dari spread (React 18.3+).
 */
export const SafeMaterialTopTabBar = (props) => (
  <TabBar
    {...props}
    renderTabBarItem={({ key: itemKey, ...itemProps }) => (
      <TabBarItem key={itemKey} {...itemProps} />
    )}
  />
);

export const materialTopTabScreenOptions = {
  tabBar: SafeMaterialTopTabBar,
  tabBarActiveTintColor: '#0074BD',
  tabBarInactiveTintColor: '#979797',
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '700',
  },
};

/**
 * @deprecated Use materialTopTabScreenOptions — tabBarButton alone does not fix TabBarItem key warning.
 */
const SafeTabBarButton = React.forwardRef((props, ref) => {
  const { key, ...restProps } = props;
  return <TouchableOpacity ref={ref} {...restProps} />;
});

SafeTabBarButton.displayName = 'SafeTabBarButton';

export const safeTabBarButton = (props) => {
  const { key, ...restProps } = props;
  return <TouchableOpacity {...restProps} />;
};

export default SafeTabBarButton;
