import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserType} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YourOrder from './YourOrder';
import ProductItem from '../components/ProductItem';

const ProfileScreen = () => {
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Hàm xử lý đăng xuất
const handleLogout = async () => {
  try {
    // Xóa thông tin đăng nhập khỏi lưu trữ
    await AsyncStorage.removeItem('userInfo');
    // Chuyển hướng người dùng đến màn hình đăng nhập hoặc màn hình chính
    // Thông qua navigation.navigate('Tên_Màn_Hình')
    navigation.navigate('Login'); // Thay 'Login' bằng tên màn hình đăng nhập của bạn
  } catch (e) {
    console.error('Lỗi khi đăng xuất:', e);
  }
};

  const HandleYourOrder = () => {
    navigation.navigate('YourOrder');
  };
  const AddProduct = () => {
    navigation.navigate('AddProduct');
  };
  const AddTicket = () => {
    navigation.navigate('AddTicket');
  }
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

        console.log('clever');
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
        console.log('Tai');
      }
    };

    fetchOrders();
  }, []);

  //Show Products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.1.8:8000/Products`);
        const orders = response.data;
        setProducts(orders);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);
  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}>
      <Pressable
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        
              <Pressable
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                }}
                // onPress={() =>
                //   navigation.navigate('Info', {
                //     id: item.id,
                //     title: item.title,
                //     price: item?.price,
                //     carouselImages: item?.carouselImages,
                //     color: item?.color,
                //     size: item?.size,
                //     oldPrice: item?.oldPrice,
                //     item: item,
                //   })
                // }>
                >
                <ProductItem item={item} key={index} />
              </Pressable>
      </Pressable>
    </View>
  );
  //

  console.log('orders', orders);

  const dateTimeParts = user?.createdAt.split('T');
  const datePart = dateTimeParts[0];
  
  // Tách thành mảng ngày, tháng, năm
  const [year, month, day] = datePart.split('-');

  // Tạo chuỗi ngày tháng năm mới
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <ScrollView style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 30,
        }}>
        <Pressable
          onPress={HandleYourOrder}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Đặt hàng của tôi</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
          onPress={() =>
            Alert.alert('Thông tin tài khoản: ', `Người dùng: ${user?.name}`)
          }>
          <Text style={{textAlign: 'center'}}>Tài khoản của tôi</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Tiếp tục mua hàng</Text>
        </Pressable>

        <Pressable
          onPress={AddProduct}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Thêm sản phẩm</Text>
        </Pressable>
        <Pressable
          onPress={AddTicket}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Thêm vé</Text>
        </Pressable>
      </View>
      

      <View style={{marginTop: 30, padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Thông tin chi tiết
        </Text>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <Text style={{fontWeight: 'bold'}}>Email: </Text>
          <Text>{user?.email}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontWeight: 'bold'}}>Mật khẩu: </Text>
          <Text>{user?.password}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontWeight: 'bold'}}>Ngày tạo tài khoản: </Text>
          <Text>{formattedDate}</Text>
        </View>
        
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 30,
        }}>
        <Pressable
          onPress={HandleYourOrder}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Đổi mật khẩu</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
          onPress={() =>
            Alert.alert('Thông tin tài khoản: ', `Người dùng: ${user?.name}`)
          }>
          <Text style={{textAlign: 'center'}}>Chỉnh sửa thông tin</Text>
        </Pressable>
      </View>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 30,
        }}>
        <Pressable
          onPress={handleLogout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Đăng xuất</Text>
        </Pressable>
      </View>

      <View style={{marginTop: 30, padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm đã thêm</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
          >
            
          <Pressable
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}></Pressable>

          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Adjust the number of columns based on your design
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
