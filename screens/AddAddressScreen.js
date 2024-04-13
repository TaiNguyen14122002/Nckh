import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useContext, useState, useCallback } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import Mic from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useDispatch, useSelector } from "react-redux";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);

  //xoá 1 địa chỉ của người dùng
  const deleteAddress = async ({ userId, addressId }) => {
    try {
      const response = await fetch(`http://192.168.1.8:8000/users/${'65773bd8d9ea4021a72b8d32'}/addresses/${addressId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        
        console.log('Address Deleted', 'Address has been deleted successfully')
      } else {
        console.log('Error', 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while trying to delete the address');
    }
  };
  const { userId, setUserId } = useContext(UserType);
  console.log("userId", userId);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.8:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 0}}>
      <View
            style={{
              backgroundColor: '#1d1d1f',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: 'white',
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}>
              <Icon
                style={{paddingLeft: 10}}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput
                placeholder="Tìm kiếm sản phẩm"
                placeholderTextColor="black"
              />
            </Pressable>
            <Mic name="mic" size={24} color="white" />
          </View>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'black'}}>Địa chỉ của bạn</Text>

        <Pressable
          onPress={() => navigation.navigate('Add')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}>
          <Text style={{color:'black'}}>Thêm địa chỉ mới</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold", color:'black' }}>
                  {item?.name}
                </Text>
                <Mic name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, Bangalore
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text style={{color:'black'}}>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                  onPress={() => deleteAddress(userId, item?._id )}
                >
                  <Text style={{color:'black'}}>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text style={{color:'black'}}>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
