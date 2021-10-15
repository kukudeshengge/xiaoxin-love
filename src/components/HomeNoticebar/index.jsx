import React, {useState, useRef, useEffect, useImperativeHandle, forwardRef} from 'react';
import getRandomText from './mock';
import {View} from '@tarojs/components';
import './index.less';

const HomeNoticebar = forwardRef((props, ref) => {
  const [barrageText, setBarrageText] = useState('');
  const textRef = useRef();
  const timer = useRef(null);
  const firstInit = useRef(true);
  useImperativeHandle(ref, () => {
    return {
      clearTimer: () => {
        clearInterval(timer.current);
        timer.current = null;
      },
      startTimer: loopFunc
    }
  })
  //timer
  const loopFunc = () => {
    if (timer.current) return;
    console.log('loopFunc')
    timer.current = setInterval(() => {
      getText();
    }, 8500)
  }
  //获取随机弹幕
  const getText = (callBack) => {
    getRandomText().then(res => {
      //判断是第一次初始化
      if (firstInit.current && callBack) {
        callBack();
        firstInit.current = false;
      }
      setBarrageText(res);
    })
  }

  useEffect(() => {
    getText(loopFunc);
  }, [])
  return (
    <View className={'HomeNoticebar'}>
      <View className='parcel_box'>
        <View ref={textRef} className={'text'}>
          {barrageText}
        </View>
      </View>
    </View>
  );
});

export default HomeNoticebar;
