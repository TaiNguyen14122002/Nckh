import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserType} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const YourOrder = () => {
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const LinkImage = 'https://blogcdn.muaban.net/wp-content/uploads/2022/07/23071106/bao-tang-my-thuat-thanh-pho-ho-chi-minh-6.jpg';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={{width: 140, height: 120, resizeMode: 'contain'}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
          {/* <Ionicons name="notifications-outline" size={24} color="black" />
  
            <AntDesign name="search1" size={24} color="black" /> */}
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.8:8000/profile/${userId}`,
        );
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.8:8000/orders/${userId}`,
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);
  console.log('orders', orders);
  return (
    <ScrollView style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Đơn hàng đã đặt của: {user?.name}
      </Text>

      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={order._id}>
              {/* Render the order information here */}
              {order.Ticket.slice(0, 1)?.map(Ticket => (
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  key={Ticket._id}>
                  <Image
                    source={{uri: LinkImage}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                  <View>
                    <View>
                      <Text style={{width: 100, fontWeight: 'bold'}}>
                        Tên sản phẩm:
                      </Text>
                      <Text
                        style={{width: 230}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {Ticket.ticket_Name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{width: 80, fontWeight: 'bold'}}>
                        Số lượng:
                      </Text>
                      <Text
                        style={{width: 150}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {Ticket.quantity}
                      </Text>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{width: 80, fontWeight: 'bold'}}>
                        Thành tiền:
                      </Text>
                      <Text
                        style={{width: 150}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {Ticket.price}đ
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{width: 80, fontWeight: 'bold'}}>Thời gian đặt vé:</Text>
                      <Text
                        style={{width: 150}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {Ticket.Time}đ
                      </Text>
                    </View>
                    <Pressable
                      style={{marginHorizontal: 10, marginVertical: 15}}>
                      <Pressable
                        onPress={() =>
                          addItemToCart(Ticket)
                        }
                        style={{
                          backgroundColor: '#1d1d1f',
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 10,
                          marginTop: 10,
                        }}>
                        {addedToCart ? (
                          <View>
                            <Text style={{color: 'white'}}>Mua lại</Text>
                          </View>
                        ) : (
                          <Text style={{color: 'white'}}>Mua lại</Text>
                        )}
                      </Pressable>
                    </Pressable>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default YourOrder;

const styles = StyleSheet.create({});
