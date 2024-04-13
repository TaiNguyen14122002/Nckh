import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Mic from 'react-native-vector-icons/Entypo';
import Sharealt from 'react-native-vector-icons/AntDesign';
import Heart from 'react-native-vector-icons/AntDesign';
import Location from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import Bookmark from 'react-native-vector-icons/Entypo';
import Share from 'react-native-vector-icons/Entypo'

const ProductinfoScreen = () => {

  const backgroundImageUri = route?.params?.image;
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const dateTimeParts = route?.params?.product_createdAt.split('T');
  const datePart = dateTimeParts[0];
  
  // Tách thành mảng ngày, tháng, năm
  const [year, month, day] = datePart.split('-');

  // Tạo chuỗi ngày tháng năm mới
  const formattedDate = `${day}-${month}-${year}`;

  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  const LinkImage =
    'https://vietnamtimes.org.vn/stores/news_dataimages/honganhvnt/052021/13/19/in_article/2109_baotangmythuat2-1620712508.png?rt=20210513192300';

  return (
    <View
      style={{flex: 1, backgroundColor: 'white'}}
      showsHorizontalScrollIndicator={false}>
      

      <View
        style={{
          backgroundColor: '#0098FF',
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          height: 700
        }}>
        <ScrollView style={{backgroundColor: 'white', borderRadius: 5, padding: 10}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* {route.params.product_image.map((item, index) => ( */}
              <ImageBackground
                style={{width: 335, height, marginTop: 10, resizeMode: 'contain'}}
                source={{uri: route?.params?.product_image }}
                
                >
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#E0E0E0',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Share name="share" size={24} color="black" />
                  </View>
                  
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 'auto',
                    marginLeft: 20,
                    marginBottom: 20,
                  }}>
                  <Heart name="heart" size={24} color="black" />
                </View>
              </ImageBackground>
            
          </ScrollView>

          <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {route?.params?.product_Name}
              {/* Tên tin tức */}
            </Text>
            <Bookmark name="bookmark" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            {/* <Text style={{color: 'black'}}>Màu sắc: </Text> */}
            <Text style={{fontSize: 15,color: 'black', textAlign: 'justify',}}>
              {route?.params?.product_information}
              
              {/* Chi tiết tin tức */}
            </Text>
          </View>
          
          <View style={{padding: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              
              {/* {route?.params?.product_createdAt} */}
              Ngày cập nhập: {formattedDate}
              {/* Ngày cập nhập tin tức */}
            </Text>
          </View>
          
          
        </ScrollView>
        <View style={{marginTop: 10}}>

          </View>
        
      </View>
      
    </View>
    
  );
};

export default ProductinfoScreen;

const styles = StyleSheet.create({});
