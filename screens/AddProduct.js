import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Button,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const AddProduct = () => {
  const [product_Name, setProduct_Name] = useState("");
  const [product_image, setProduct_image] = useState("");
  const [product_information, setProduct_information] = useState("");

  const navigation = useNavigation();

  const requestCamera = async () => {
    try {
      const checkPermissioc = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkPermissioc === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({mediaType: 'photo'});
        console.log(result.assets[0].uri);
        setProduct_image(result.assets[0].uri);
        //console.log("ok")
      } else {
        console.log('Tu Choi');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const chooseImage = () => {
  //     launchImageLibrary({}, response => {
  //         if (response.didCancel) {
  //             console.log('User cancelled image picker');
  //         } else if (response.error) {
  //             console.log('ImagePicker Error: ', response.error);
  //         } else  { // Kiểm tra response.uri có giá trị
  //             const source = { uri: response.uri };
  //             setProduct_image(source);
  //             // uploadImage(response);
  //         }
  //     });
  // };

  const handleAdd_Product = () => {
    const Product = {
      product_Name: product_Name,
      product_image: product_image,
      product_information: product_information,
    };

    axios.post("http://192.168.1.2:8000/AddProduct", Product)
        .then((message) => {
            console.log(message);
            Alert.alert("Thông báo", "Thêm vé thành công");
            setProduct_Name("");
            setProduct_image("");
            setProduct_information("");
            navigation.navigate('Main');
        })
            .catch((error) => {
                Alert.alert(
                    "Lỗi",
                    "Thêm vé thất bại"
                );
                console.log("Add Ticket failed", error)
                console.log(name, email, password)
            });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{marginTop: 20}}>
        <Image
          style={{width: 350, height: 200}}
          source={{
            uri: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1692178730/nzwespti6zcfe6h3ljwy.jpg',
          }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false} // Ẩn thanh trượt dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
      >
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
              <Entypo
                style={{marginLeft: 8}}
                name="user"
                size={24}
                color="gray"
              />
              <TextInput
                value={product_Name}
                onChangeText={text => setProduct_Name(text)}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: product_Name ? 16 : 16,
                }}
                placeholder="Nhập tên tin tức"
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'space-between',
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
              {/* <TextInput
                            value={Price}
                            onChangeText={(text) => setPrice(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Price ? 16 : 16 }}
                            placeholder="Nhập hình ảnh tin tức"
                        /> */}

              <Text style={{marginRight: 60}}>Hình ảnh tin tức</Text>

              <Button title="Chọn hình ảnh" onPress={requestCamera} />
              {product_image && (
                <Image
                  source={{uri: product_image}}
                  style={{width: 100, height: 100}}
                />
              )}
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
              <MaterialCommunityIcons
                style={{marginLeft: 8}}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={product_information}
                onChangeText={text => setProduct_information(text)}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: product_information ? 16 : 16,
                }}
                placeholder="Thông tin tin tức"
              />
            </View>
          </View>

          <View style={{marginTop: 50}} />

          <Pressable
            onPress={handleAdd_Product}
            style={{
              width: 200,
              backgroundColor: '#428bca',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Thêm tin tức
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={{marginTop: 20}}></View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
