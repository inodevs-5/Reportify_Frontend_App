import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Perfil from '../Perfil';

const Icone = ({ name, email, type }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handlePress = () => {
    setShowProfile(!showProfile);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Icon name="account-circle" size={30} />
      </TouchableOpacity>
      {showProfile && <Perfil name={name} email={email} type={type} />}
    </View>
  );
};

export default Icone;
