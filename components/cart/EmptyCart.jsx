import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants';

const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops..!! Your Cart Is Empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:90,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: SIZES.large,
    fontFamily: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default EmptyCart;
