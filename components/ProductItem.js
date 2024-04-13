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

  const dateTimeParts = item?.product_createdAt.split('T');
  const datePart = dateTimeParts[0];
  
  // Tách thành mảng ngày, tháng, năm
  const [year, month, day] = datePart.split('-');

  // Tạo chuỗi ngày tháng năm mới
  const formattedDate = `${day}-${month}-${year}`;

  const LinkImage = 'https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/6486523394594f58948026dde1e799ca~tplv-tej9nj120t-origin.webp';
  return (
    <Pressable
      style={{marginHorizontal: 10}}
      onPress={() =>
        navigation.navigate('News_Details', {
          id: item.id,
          product_Name: item.product_Name,
          product_image: item.product_image,
          product_information: item.product_information,
          product_createdAt: item.product_createdAt,
          
        })
      }>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            width: 110,
            height: 140,
            resizeMode: 'contain',
            borderRadius: 5,
            borderColor: '#ccc',
            borderWidth: 2,
          }}
          source={{uri: item?.product_image}}
          // source={{uri: LinkImage}}
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
                color: 'black',
                fontSize: 18,
              }}>
              {item?.product_Name} 
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontWeight: '400',
                  width: 200,
                  marginLeft: -3,
                  marginTop: 10,
                  marginLeft: 10,
                  flexWrap: 'wrap',
                  textAlign: 'justify',
                }}>
                
                {item?.product_information}
                {/* Thông tin tin tức */}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#1d1d1f'}}>
              
              {/* {item?.product_createdAt} */}
              Ngày cập nhập: {formattedDate}
              {/* Ngày cập nhập tin tức */}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
