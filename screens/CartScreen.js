import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    Image,
  } from "react-native";
  import React from "react";
  import Icon from 'react-native-vector-icons/AntDesign';
  import Mic from 'react-native-vector-icons/Entypo';
  import { useDispatch, useSelector } from "react-redux";
  import {
    decrementQuantity,
    incementQuantity,
    removeFromCart,
  } from "../redux/CartReducer";
  import { useNavigation } from "@react-navigation/native";
  
  const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    const total = cart
      ?.map((item) => item.Price * item.quantity)
      .reduce((curr, prev) => curr + prev, 0);
      const formattedTotal = total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Đổi 'VND' nếu đơn vị tiền tệ khác
    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
      dispatch(incementQuantity(item));
    };
    const decreaseQuantity = (item) => {
      dispatch(decrementQuantity(item));
    };
    const deleteItem = (item) => {
      dispatch(removeFromCart(item));
    };
    const navigation = useNavigation();

    const LinkImage = 'https://blogcdn.muaban.net/wp-content/uploads/2022/07/23071106/bao-tang-my-thuat-thanh-pho-ho-chi-minh-6.jpg';
    return (
      <ScrollView style={{  flex: 1, backgroundColor: "white" }}>
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
  
        <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" ,color:'black'}}>Thành tiền : </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold",color:'black' }}>{formattedTotal}</Text>
        </View>
        <Text style={{ marginHorizontal: 10,color:'black'}}>Đã bao gồm phí VAT</Text>
  
        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#1d1d1f",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text style={{color:'white'}}>Tiến hành mua ({cart.length}) sản phẩm</Text>
        </Pressable>
  
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
            color:'black'
          }}
        />
  
        <View style={{ marginHorizontal: 10 }}>
          {cart?.map((item, index) => (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                    source={{ uri: LinkImage }}
                  />
                </View>
  
                <View >
                  <Text numberOfLines={3} style={{ width: 150, marginTop: 10, color:'black', fontWeight: "400", fontSize: 18 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" ,color:'black'}}>Tên loại vé : </Text>
                    {item?.ticket_Name}
                  </Text>
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", marginTop: 6,color:'black' }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "400" ,color:'black'}}>Thành tiền : </Text>
                    {item?.Price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}></Text>
                  {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                    {item?.rating?.rate} ratings
                  </Text> */}
                </View>
              </Pressable>
  
              <Pressable
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Icon name="minus" size={24} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Icon name="delete" size={24} color="black" />
                    </Pressable>
                  )}
  
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{color:'black'}}>{item?.quantity}</Text>
                  </Pressable>
  
                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Mic name="plus" size={24} color="black" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text style={{color:'black'}}>Xoá sản phẩm</Text>
                </Pressable>
              </Pressable>
  
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                
  
                
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  export default CartScreen;
  
  const styles = StyleSheet.create({});