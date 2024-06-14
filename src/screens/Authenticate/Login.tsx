import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { authState as mode } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import { useTheme } from '@src/context/ThemeContext';

type Props = {
  setMode: Dispatch<SetStateAction<mode>>;
  setUser: Dispatch<SetStateAction<string>>;
  passPassword: Dispatch<SetStateAction<string>>;
}

export const api = axios.create();

const LoginScreen = ({ setMode, setUser, passPassword }: Props) => {
  const styles = useTheme();
  
  const refPassword = useRef<TextInput>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === 'clear' && password === 'clear') {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        Alert.alert('Error', `${error}`);
      }
      return;
    }
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const storedHashedPassword = await AsyncStorage.getItem(`user:${username}`);

    if (hashedPassword === storedHashedPassword) {
      const endpoint = await AsyncStorage.getItem(`${username}:endpoint`);
      if (!endpoint) {
        Alert.alert('Error', 'No endpoint found');
        return;
      };
      api.defaults.baseURL = endpoint;

      const key = await AsyncStorage.getItem(`${username}:apiKey`);
      if (!key) {
        Alert.alert("No API key found");
      } else {
        api.defaults.headers['x-api-key'] = key;
      }

      await AsyncStorage.setItem('user', username);
      setUser(username);
      setMode('loggedIn');
    } else if (storedHashedPassword === null) {
      setUser(username);
      passPassword(password);
      setMode('link');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={styles.title_card}>
        <Image
          source={require('../../../assets/Title2.png')}
        />
      </View>
      <View style={{ flex: 1 }} />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        textColor={styles.input_text.color}
        onSubmitEditing={() => refPassword.current.focus()}
      />
      <TextInput
        ref={refPassword}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        textColor={styles.input_text.color}
        onSubmitEditing={handleLogin}
      />
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        textColor={styles.input.backgroundColor}
      >
        Submit
      </Button>
      <Button mode="text" onPress={() => { setMode('createAccount') }} style={styles.button}>
        Create Account
      </Button>
      <View style={{ flex: 3 }} />
    </View>
  );
};

export default LoginScreen;
