import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserType} from '../UserContext';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {cleanCart} from '../redux/CartReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'
import { equestBillingAgreement } from 'react-native-paypal';
import { requestOneTimePayment } from 'react-native-paypal';
import DocCircCleO from 'react-native-vector-icons/FontAwesome'

const ConfirmationScreen = () => {
  const steps = [
    {title: 'Địa chỉ', content: 'Address Form'},
    {title: 'Vận chuyển', content: 'Delivery Options'},
    {title: 'Phương thức thanh toán', content: 'Payment Details'},
    {title: 'Tiến hành đặt hàng', content: 'Order Summary'},
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.2:8000/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(addresses);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: formattedTotal,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await axios.post(
        'http://192.168.1.2:8000/orders',
        orderData,
      );

      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
        console.log('Tai');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "USD",
        name: "TCL_STORE",
        key: "rzp_test_E3GWYimxN7YMk8",
        amount: total * 100,
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Tai Nguyen",
        },
        theme: { color: "#F37254" },
      };

      const data = await RazorpayCheckout.open(options);

      console.log(data);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(
        "http://192.168.1.2:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{}}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {steps?.map((step, index) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{textAlign: 'center', marginTop: 8, color: 'black', marginTop: 10}}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Chọn địa chỉ giao hàng
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}>
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
                ) : (
                  <Icon
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{marginLeft: 6}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item?.name}
                    </Text>
                    <Icon name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{fontSize: 15, color: '#181818'}}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text style={{fontSize: 15, color: 'black'}}>
                    {item?.street}
                  </Text>

                  <Text style={{fontSize: 15, color: '#181818'}}>
                    India, Bangalore
                  </Text>

                  <Text style={{fontSize: 15, color: '#181818'}}>
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{fontSize: 15, color: '#181818'}}>
                    pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 7,
                    }}>
                    <Pressable
                      style={{
                        backgroundColor: '#F5F5F5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#D0D0D0',
                      }}>
                      <Text style={{color: 'black'}}>Sửa</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#F5F5F5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#D0D0D0',
                      }}>
                      <Text style={{color: 'black'}}>Xoá</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#F5F5F5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#D0D0D0',
                      }}>
                      <Text style={{color: 'black'}}>Đặt làm mặc định</Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: '#008397',
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text style={{textAlign: 'center', color: 'black'}}>
                          Sửa dụng địa chỉ này
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Chọn phương thức vận chuyển
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            {option ? (
              <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
            ) : (
              <Icon
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{flex: 1, color: 'black'}}>
              <Text style={{color: 'green', fontWeight: '500'}}>
                Tomorrow by 10pm
              </Text>{' '}
              - Đã bao gồm phí VAT
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Chọn phương thức thanh toán
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'cash' ? (
              <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
            ) : (
              <Icon
                onPress={() => setSelectedOption('cash')}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{color: 'black'}}>Thanh toán khi nhận hàng</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'paypal' ? (
              <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
            ) : (
              <Icon
                onPress={() => {
                  setSelectedOption('paypal');
                  Alert.alert('UPI/Debit paypal', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{color: 'black'}}>Napas / Thêm thẻ thanh toán quốc tế Visa</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text style={{color: 'black'}}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Tiến hành đặt hàng
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
                Mã khuyến mãi
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  marginTop: 5,
                  color: 'black',
                }}>
                Chọn mã khuyến mãi
              </Text>
            </View>

            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{color: 'black'}}>
              Đơn hàng vận chuyển tới {selectedAddress?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                Giá sản phẩm
              </Text>

              <Text style={{color: 'black', fontSize: 16}}>{total}đ</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                Giá vận chuyển
              </Text>

              <Text style={{color: 'black', fontSize: 16}}>0đ</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Thành tiền
              </Text>

              <Text
                style={{color: '#C60C30', fontSize: 17, fontWeight: 'bold'}}>
                {total}đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>Thanh toán với</Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginTop: 7,
                color: 'black',
              }}>
              Thanh toán khi nhận hàng (Cash)
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>Đặt hàng</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
