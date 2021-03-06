import React from 'react';
import {SafeAreaView, ScrollView, Button, View} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';

import {whiteColor, blackColor} from '../../constants/colors';
import ShareUtil from '../../utils/native/ShareUtil';

const Share = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  const onPressShare = () => {
    ShareUtil.shareboard(
      '这是一条分享测试',
      'https://cdn.upcwangying.com/logo/avatar.JPG?v=7.1.0',
      'https://github.com/upcwangying',
      '测试',
      [0, 1, 2, 3, 4, 5, 6, 9, 28, 32],
      () => {},
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button title="Share" onPress={onPressShare} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  scrollView: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  body: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
    paddingTop: 24,
  },
  sectionTitle: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue(whiteColor, blackColor),
    textAlign: 'center',
  },
});

export default Share;
