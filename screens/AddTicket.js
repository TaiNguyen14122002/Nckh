import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const AddTicker = () => {
    const [ticket_Name, setTicket_Name] = useState("");
    const [Price, setPrice] = useState("");
    const [Note, setNote] = useState("");
    const navigation = useNavigation();

    
    const handleAdd_Ticket = () => {
        const Ticket = {
            ticket_Name: ticket_Name,
            Price: Price,
            Note: Note,
        };

        // send a post request to the backend API
        axios.post("http://192.168.1.8:8000/AddTicket", Ticket)
        .then((message) => {
            console.log(message);
            Alert.alert("Thông báo", "Thêm vé thành công");
            setTicket_Name("");
            setPrice("");
            setNote("");
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: 'center'}}>
            {/* <View>
                <Text style={{
                    fontSize: 27,
                    fontWeight: "bold",
                    marginTop: 12,
                    color: "#041E42"
                }}
                >
                    
                </Text>
            </View> */}

            <View style={{marginTop: 20}}>
                <Image
                    style={{ width: 350, height: 200 }}
                    source={{
                        uri: "https://res.klook.com/image/upload/q_85/c_fill,w_750/v1692178730/nzwespti6zcfe6h3ljwy.jpg",
                    }} />
            </View>
            
            <KeyboardAvoidingView>



                <View style={{ marginTop: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30
                    }}
                    >
                        <Entypo style={{ marginLeft: 8 }} name="user" size={24} color="gray" />
                        <TextInput
                            value={ticket_Name}
                            onChangeText={(text) => setTicket_Name(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: ticket_Name ? 16 : 16 }}
                            placeholder="Nhập tên loại vé"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30
                    }}
                    >

                        <MaterialCommunityIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                        <TextInput
                            value={Price}
                            onChangeText={(text) => setPrice(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Price ? 16 : 16 }}
                            placeholder="Nhập giá vé"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30
                    }}
                    >

                        <MaterialCommunityIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                        <TextInput
                            value={Note}
                            onChangeText={(text) => setNote(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Note ? 16 : 16 }}
                            placeholder="Ghi chú"
                        />
                    </View>
                </View>

                

                

                <View style={{ marginTop: 50 }} />

                <Pressable
                    onPress={handleAdd_Ticket}
                    style={{
                        width: 200,
                        backgroundColor: "#428bca",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: "bold" }}>
                        Thêm vé
                    </Text>
                </Pressable>

                {/* <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: 'center', color: "gray", fontSize: 16 }}>
                        Bạn đã có tài khoản ? Đăng nhập
                    </Text>
                </Pressable> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AddTicker

const styles = StyleSheet.create({})