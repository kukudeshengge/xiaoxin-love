import Mock from 'mockjs';
import {getRandomIndex} from '../../utils/random';

const textList = [
  '投放了一个纸条今晚的月亮好圆',
  '取出了一个纸条爱情就是甜甜蜜蜜'
]



//获取随机弹幕
export default function getRandomText() {
  return new Promise((reslove, reject) => {
    try {
      const index = getRandomIndex(textList.length);
      const name = Mock.Random.cname();
      const result = name + textList[index];
      reslove(result);
    } catch (err) {
      reject(err);
    }
  })
}
