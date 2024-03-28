// ProductList.js
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Pressable} from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.1.2:8000/Products`);
        const orders = response.data;
        setProducts(orders);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({item}) => (
    <Pressable
      style={{
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
      }}
      onPress={() =>
        navigation.navigate('Info', {
          id: item.id,
          title: item.title,
          price: item?.price,
          carouselImages: item.carouselImages,
          color: item?.color,
          size: item?.size,
          oldPrice: item?.oldPrice,
          item: item,
        })
      }>
      <Pressable style={{marginHorizontal: 10, marginVertical: 15}} onPress={() =>
      navigation.navigate('Info', {
        id: item.id,
        title: item.title,
        price: item?.price,
        carouselImages: item.carouselImages,
        color: item?.color,
        size: item?.size,
        oldPrice: item?.oldPrice,
        item: item,
      })
    }>
      
      

      <Text numberOfLines={1} style={{width: 150, marginTop: 10}}>
        <Text style={{alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
        {item?.title}
        </Text>
        
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        
        <Text style={{fontWeight: '400', marginLeft: -3}}> {item?.category}</Text>
        <Text style={{ fontWeight: '400'}}>
          {item?.ram}-{item?.size}
        </Text>
        
      </View>
      <View style={{alignItems:'center', marginTop: 10}}>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#1d1d1f'}}>{item?.price}đ</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: '#1d1d1f',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        
      </Pressable>
    </Pressable>
    </Pressable>
  );

  return (
    <View>
      <View>
        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#1d1d1f',
          }}>
          Sản phẩm
        </Text>
      </View>

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
          }}></Pressable>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Adjust the number of columns based on your design
        />
      </View>
    </View>
  );
};

export default ProductList;
