import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const DrawerMenuButton = ({ color = '#0074BD' }) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    const parent = navigation.getParent();
    if (parent?.openDrawer) {
      parent.openDrawer();
      return;
    }
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={openDrawer} style={styles.button} accessibilityLabel="Buka menu">
      <Icon name="menu" size={26} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 12,
    padding: 4,
  },
});

export default DrawerMenuButton;
