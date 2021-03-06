import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import Swiper from 'react-native-swiper';

import {whiteColor, blackColor} from '../../constants/colors';

const SwiperPage = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  return (
    <ScrollView style={styles.scrollView}>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      <Swiper style={styles.wrapper} showsButtons={true} autoplay>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      <Swiper
        style={styles.wrapper}
        height={200}
        showsButtons={true}
        horizontal={false}
        autoplay>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    </ScrollView>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  scrollView: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  wrapper: {
    height: 200,
    marginVertical: 20,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: whiteColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SwiperPage;
