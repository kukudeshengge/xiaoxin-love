import React, {useEffect} from 'react';
import {AtActivityIndicator} from '../index';
import './index.less';
import {View} from '@tarojs/components';

const Loading = ({content, isOpened, color}) => {
  // useEffect(() => {
  //   if (isOpened) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [isOpened])
  return (
    <View className={'loading_mask'}>
      <AtActivityIndicator
        color={color}
        content={content}
        isOpened={isOpened}
        mode='center'
      >
      </AtActivityIndicator>
    </View>
  );
};

export default Loading;
