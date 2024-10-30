import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress,title, buttonStyle, textStyle}) => (
  <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    justifyContent:"center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily:"Jua"
  },
});

export default CustomButton;
