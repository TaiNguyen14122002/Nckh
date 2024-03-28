import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const PriceListScreen = () => {
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BẢNG GIÁ THAM QUAN BẢO TÀNG</Text>
      <Text style={styles.subheader}>(ÁP DỤNG TỪ 01/01/2018)</Text>
      <Text style={styles.sectionHeader}>
        A. GIÁ VÉ: 40.000 ĐỒNG/NGƯỜI/LƯỢT
      </Text>
      <Text style={styles.sectionHeader}>B. CHẾ ĐỘ MIỄN, GIẢM:</Text>
      <Text style={styles.subSectionHeader}>
        I. Miễn phí tham quan đối với các trường hợp sau:
      </Text>
      <Text>1. Trẻ em dưới 6 tuổi;</Text>
      <Text>
        2. Người khuyết tật đặc biệt nặng quy định tại Khoản 1 – Điều 11 – Nghị
        định số 28/2012/NĐ-CP ngày 10/4/2012 của Chính phủ;
      </Text>
      <Text>
        3. Hộ nghèo: quy định tại Quyết định số 59/2015/QĐ-TTg ngày 19/11/2015
        của Thủ tướng Chính phủ.
      </Text>
      <Text style={styles.subSectionHeader}>
        II. Giảm 50% phí tham quan đối với các trường hợp sau:
      </Text>
      <Text>1. Trẻ em từ 6 tuổi đến dưới 16 tuổi.</Text>
      <Text>
        2. Sinh viên, học sinh đang học tại các trường thuộc hệ thống giáo dục
        quốc dân Việt Nam;
      </Text>
      <Text>
        3. Người cao tuổi: là công dân Việt Nam từ đủ 60 tuổi trở lên, quy định
        tại Điều 2 - Luật Người cao tuổi;
      </Text>
      <Text>
        4. Người khuyết tật nặng: quy định tại Khoản 2 – Điều 11 – Nghị định số
        28/2012/NĐ-CP ngày 10/4/2012 của Chính phủ;
      </Text>
      <Text>
        5. Các đối tượng được hưởng chính sách ưu đãi hưởng thụ văn hóa theo
        Điều 2 – QĐ170/2003/QĐ-TTg ngày 14/8/2003 của Thủ tướng Chính phủ gồm:
      </Text>
      <Text>
        {' '}
        - Nhân dân ở các xã đặc biệt khó khăn miền núi và vùng sâu, vùng xa được
        quy định trong Chương trình 135 của Chính phủ;
      </Text>
      <Text> - Người có công với cách mạng:</Text>
      <Text> a) Cán bộ lão thành cách mạng; cán bộ "tiền khởi nghĩa";</Text>
      <Text> b) Thân nhân liệt sĩ;</Text>
      <Text>
        {' '}
        c) Anh hùng Lực lượng vũ trang, Anh hùng Lao động, Bà mẹ Việt Nam anh
        hùng;
      </Text>
      <Text>
        {' '}
        d) Thương binh, người hưởng chính sách như thương binh, bệnh binh;
      </Text>
      <Text>
        {' '}
        đ) Các đối tượng được chăm sóc tại các cơ sở nuôi dưỡng, điều dưỡng
        thương, bệnh binh và người có công.
      </Text>
      <Text> - Người thuộc diện chính sách xã hội:</Text>
      <Text> a) Người tàn tật, người già cô đơn;</Text>
      <Text> b) Các đối tượng được chăm sóc tại cơ sở bảo trợ xã hội;</Text>
      <Text> c) Học sinh các trường phổ thông dân tộc nội trú.</Text>
      <Text style={styles.note}>
        Ghi chú: đối với các trường hợp miễn, giảm phải xuất trình giấy tờ chứng
        minh thuộc các đối tượng được miễn, giảm theo quy định.
      </Text>
      <Text style={styles.contact}>Liên hệ hướng dẫn tham quan:</Text>
      <Text>Điện thoại: 083 7396190 - Mr. Tai</Text>
      <Text>Email: 2024801030129@student.tdmu.edu.vn</Text>
      <View style={{padding: 20}}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subSectionHeader: {
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 3,
  },
  note: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  contact: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default PriceListScreen;
