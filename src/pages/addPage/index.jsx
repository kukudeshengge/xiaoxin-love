import React, { useRef, useState } from 'react';
import './index.less';
import { AtToast } from "../../uiComponent";
import { setItem } from "../../store";
import Loading from '../../uiComponent/loading';
import { storeObjectEnum, requestDefaultTime } from '../../config';
import { View, Text, Image, Form, Button, Radio, RadioGroup, Input, Textarea, Picker, Label } from '@tarojs/components';
import {formKey} from './config';



const defaultDateValue = '请选择出生日期';
const AddPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [toastText, setToastText] = useState('');
  const [dateValue, setDataValue] = useState(defaultDateValue);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setKey] = useState(1);
  const putMessage = (event) => {
    const formData = event.detail.value;
    const startNow = Date.now();
    //要存入的数据
    const value = {};
    for (let key in formKey) {
      const item = formKey[key];
      const itemValue = formData[item.name]

      //如果有空值并且是必填项，给用户提示，并终止循环
      if (!itemValue && item.required) {
        setToastText(`${item.title}不能为空`);
        setIsOpened(true);
        return;
        //想value对象赋值数据，不存在则存入空字符串
      }
      value[key] = itemValue ? itemValue : ''
    }
    const { sex } = value;
    setLoading(true);
    //判断是男生入男生库
    setItem(storeObjectEnum[sex], value)
      .then(() => {
        const endNow = Date.now();
        setTimeout(() => {
          setToastText('投放成功');
          setIsOpened(true);
          resetForm();  //置空form
          setDataValue(defaultDateValue); //置空生日
        }, requestDefaultTime - (endNow - startNow))
      }).catch(() => {
        setToastText('投放失败，请稍后重试');
        setIsOpened(true);
      }).finally(() => {
        const endNow = Date.now();
        setTimeout(() => {
          setLoading(false);
        }, requestDefaultTime - (endNow - startNow))
      })
  }
  //清空form表单
  const resetForm = () => {
    setKey(refreshKey + 1);
  }
  return (
    <View className={'add_page'}>
      {loading && <Loading isOpened={true} />}
      <AtToast isOpened={isOpened} text={toastText} onClose={() => setIsOpened(false)}></AtToast>
      <View className={'img'}>
        <Image className='imgage' src={require('../../images/1.jpeg')} />
      </View>
      <View className={'add_form'}>
        <Form onSubmit={putMessage} key={refreshKey}>
          {
            Object.keys(formKey).map((key, index) => {
              const item = formKey[key];
              const { title, placeholder, required, type } = item;
              const c = ['form_item', required ? 'required_fix' : ''].join(' ');
              if (type === 'text') {
                return <View className={c}>
                  <Text className={'name'}>{title}</Text>
                  <Input
                    name={key}
                    title={title}
                    type='text'
                    placeholder={placeholder}
                  />
                </View>
              } else if (type === 'textarea') {
                return <View className={'textarea_box form_item'}>
                  <View style={{ marginBottom: 13 }}>{title}</View>
                  <Textarea
                    maxLength={200}
                    name={formKey.desc.name}
                    placeholder={placeholder}
                  ></Textarea>
                </View>
              } else if (type === 'radio') {
                return <View className={'form_item'}>
                  <Text className={'name'}>{title}</Text>
                  <RadioGroup className='radio' name={key}>
                    <Label>
                      <View>
                        <Radio value='0' />
                      </View>
                      <View>男</View>
                    </Label>
                    <Label>
                      <View>
                        <Radio value='1' />
                      </View>
                      <View>女</View>
                    </Label>
                  </RadioGroup>
                </View>
              } else if (type === 'datePicker') {
                return <View className={'form_item'}>
                  <Text className={'name'}>{title}</Text>
                  <Picker mode='date'
                    name={key}
                    className='date_picker' onChange={e => {
                      setDataValue(e.detail.value)
                    }}>
                    <Text className={dateValue === defaultDateValue ? 'none' : ''}>{dateValue}</Text>
                  </Picker>
                </View>
              }
            })
          }
          <View className={'add_btn_box'}>
            <Button formType='submit' className='button'>立即投放</Button>
          </View>
        </Form>
      </View>
    </View>
  );
};

export default AddPage;
