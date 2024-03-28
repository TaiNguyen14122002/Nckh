import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import ProductinfoScreen from '../screens/ProductinfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OderScreen from '../screens/OderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import YourOrder from '../screens/YourOrder';
import Shoppingcart from 'react-native-vector-icons/AntDesign'
import Home from 'react-native-vector-icons/AntDesign'
import User from 'react-native-vector-icons/AntDesign'
import UUser from 'react-native-vector-icons/FontAwesome'
import House from 'react-native-vector-icons/FontAwesome'
import Cart from 'react-native-vector-icons/FontAwesome'
import AddProduct from '../screens/AddProduct';
import HandleMap from '../screens/HandleMap';
import Order_Sticker from '../screens/Order_Sticker'
import Ticket from 'react-native-vector-icons/FontAwesome'
import Ticket_outline from 'react-native-vector-icons/Ionicons'
import Select_ticket from '../screens/Select_ticket'
import AddTicket from '../screens/AddTicket'
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#428bca'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <House name="home" size={24} color="black" />
              ) : (
                <Home name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: '#428bca'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <UUser name="user" size={24} color="black" />
              ) : (
                <User name="user" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {color: '#428bca'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Cart name="shopping-cart" size={24} color="black" />
              ) : (
                <Shoppingcart name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Sticker"
          component={Order_Sticker}
          options={{
            tabBarLabel: 'Sticker',
            tabBarLabelStyle: {color: '#428bca'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ticket name="ticket" size={24} color="black" />
              ) : (
                <Ticket_outline name="ticket-outline
                " size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="News_Details"
          component={ProductinfoScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Order"
          component={OderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="YourOrder"
          component={YourOrder}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: true }}
          
        />
        <Stack.Screen
          name="HandleMap"
          component={HandleMap}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen
          name="Select_ticket"
          component={Select_ticket}
          options={{ headerShown: true }}
          
        />
        <Stack.Screen
          name="AddTicket"
          component={AddTicket}
          options={{ headerShown: true }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
