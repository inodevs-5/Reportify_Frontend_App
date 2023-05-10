import React from 'react';
import { Text, View } from 'react-native';

const Perfil = ({ name, email, type }) => {
  return (
    <View>
      <Text>Nome: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Tipo de perfil: {type}</Text>
    </View>
  );
};

export default Perfil;
