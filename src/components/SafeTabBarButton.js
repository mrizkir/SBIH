import React from 'react';
import { TouchableOpacity } from 'react-native';

/**
 * SafeTabBarButton - Wrapper untuk TabBarButton yang menghapus key dari props
 * untuk menghindari warning "A props object containing a 'key' prop is being spread into jsx"
 */
const SafeTabBarButton = React.forwardRef((props, ref) => {
  const { key, ...restProps } = props;
  return <TouchableOpacity ref={ref} {...restProps} />;
});

SafeTabBarButton.displayName = 'SafeTabBarButton';

/**
 * safeTabBarButton - Function untuk digunakan di screenOptions.tabBarButton
 * Extract key prop sebelum spread ke JSX untuk menghindari React warning
 */
export const safeTabBarButton = (props) => {
  const { key, ...restProps } = props;
  return <TouchableOpacity {...restProps} />;
};

export default SafeTabBarButton;

