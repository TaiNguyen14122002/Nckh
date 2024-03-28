import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';
import Bookmark from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/AntDesign';

const ProductItem = ({item}) => {

  

  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const LinkImage = 'https://blogcdn.muaban.net/wp-content/uploads/2022/07/23071106/bao-tang-my-thuat-thanh-pho-ho-chi-minh-6.jpg';
  return (
    <Pressable
      style={{marginHorizontal: 10}}
      >
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            marginTop: 10,
            width: 110,
            height: 150,
            resizeMode: 'contain',
            borderRadius: 5,
            borderColor: '#ccc',
            borderWidth: 2,
          }}
          // source={{uri: item?.image}}
           source={{uri: LinkImage}}
        />
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text
            numberOfLines={1}
            style={{width: 150, marginTop: 10, marginLeft: 10}}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#f5f5f5',
                fontSize: 25,
              }}>
              {item?.ticket_Name} 
              {/* Tên tin tức */}
            </Text>
          </Text>
          <Bookmark
                  style={{marginTop: 0, marginLeft: 10}}
                  name="bookmark"
                  size={22}
                  color="black"
                />
          </View>
          

          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  width: 200,
                  marginLeft: -3,
                  marginTop: 0,
                  marginLeft: 10,
                  flexWrap: 'wrap',
                  color: '#f5f5f5',
                }}>
                <Text style={{fontWeight: 'bold', color: 'white',}}>Ghi chú:  </Text> 
                {item?.Note}
                {/* Thông tin tin tức */}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 0,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              color: '#f5f5f5',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              
            {item?.Price.toLocaleString('vi-VN')}đ
              {/* Ngày cập nhập tin tức */}
            </Text>
          </View>
          <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          width: 70,
          backgroundColor: '#1d1d1f',
          padding: 7,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        {addedToCart ? (
          <View>
            <Text style={{color: 'white'}}>Đã thêm</Text>
          </View>
        ) : (
          <Text style={{color: 'white'}}>Thêm vé</Text>
        )}
      </Pressable>
        </View>
        
      </View>
      
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
