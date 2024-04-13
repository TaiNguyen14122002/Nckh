import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useState,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import jwt_decode from "jwt-decode"
  import { UserType } from "../UserContext";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  
  const AddressScreen = () => {
      const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId} = useContext(UserType)
    useEffect(() => {
      const fetchUser = async() => {
          const token = await AsyncStorage.getItem("authToken");
          console.log('Token:', token);
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          console.log("userId",userId)
          setUserId(userId)
          
      }
      fetchUser();
    },[]);
    
    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }
  
        axios.post("http://192.168.1.8:8000/addresses",{userId,address}).then((response) => {
            Alert.alert("Success","Addresses added successfully");
            setName("");
            setMobileNo("");
            setHouseNo("");
            setStreet("");
            setLandmark("");
            setPostalCode("");
  
            setTimeout(() => {
              navigation.goBack();
            },500)
        }).catch((error) => {
            Alert.alert("Error","Failed to add address")
            console.log("error",error)
        })
    }
    return (
      <ScrollView style={{}}>
        {/* <View style={{ height: 50, backgroundColor: "#1d1d1f" }} /> */}
  
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" ,color:'black'}}>
            Thêm địa chỉ mới
          </Text>
  
          <TextInput
            placeholderTextColor={"black"}
            placeholder="Tỉnh, Thành phố"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>
              Họ và tên
            </Text>
  
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Tên người nhận hàng"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>
              Số điện thoại
            </Text>
  
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Số điện thoại nhận hàng"
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>
              Địa chỉ giao hàng, số nhà, Khu phố
            </Text>
  
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>
              Đường, Công ty
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>Xã, phường, thị trấn</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>Mã Code</Text>
  
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <Pressable
          onPress={handleAddAddress}
            style={{
              backgroundColor: "#1d1d1f",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" ,color:'black', color:'white'}}>Thêm địa chỉ</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default AddressScreen;
  
  const styles = StyleSheet.create({});