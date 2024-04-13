import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios.post('http://192.168.1.8:8000/login', user).then(Response => {
      console.log(Response);
      const token = Response.data.token;
      AsyncStorage.setItem('authToken', token);
      navigation.replace('Main');
      console.log("Tai")
    });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        {/* <Image
          style={{width: 150, height: 100}}
          source={{
            uri: 'https://brandlogos.net/wp-content/uploads/2016/10/amazon-logo-preview.png',
          }}
        /> */}
        <Text style={{marginTop: 50, fontWeight: '900', fontSize: 40, color: 'black'}}>TCL_STORE</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginTop: 80,
            color: '#041E42',
          }}>
          Đăng nhập với tài khoản của bạn
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <MaterialCommunityIcons
              style={{marginLeft: 8}}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Nhập email"
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <AntDesign
              style={{marginLeft: 8}}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Nhập mật khẩu"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Lưu thông tin</Text>
          <Text style={{color: '#007FFF', fontWeight: '500'}}>
            Quên mật khẩu
          </Text>
        </View>

        <View style={{marginTop: 50}} />

        <Pressable
          style={{
            width: 200,
            backgroundColor: '#428bca',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Đăng nhập
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            {' '}
            Bạn chưa có tài khoản? Đăng Ký
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
