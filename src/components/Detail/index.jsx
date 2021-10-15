
import React from 'react';
import { View, Text, Image } from '@tarojs/components'
import { formKey } from '../../pages/addPage/config';
import './index.less';


// const value = {
//   "desc": "",
//   "sex": "1",
//   "name": "方面么",
//   "weight": "",
//   "weChat": "啊哈哈",
//   "height": "",
//   "id": "61666e92c9dac651d11ccb8f"
// }
const Detail = ({ value }) => {

  const { sex, id, ...others } = value;
  return <View className={'detail_box'}>
    <View className="title">抽取结果</View>
    <View className='result'>
      {
        Object.keys(formKey).map((key, index) => {
          const title = formKey[key]?.title;
          return <View key= { index } className='result_item'>
            <Text>{title}：</Text>
            <Text>{others[key] || '未知'}</Text>
          </View>
        })
      }
    </View>
  </View >
}

export default Detail;