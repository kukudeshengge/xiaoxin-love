import React, { Component } from 'react'
import { View, Image,Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import { queryAll } from '../../store';
import HomeNoticebar from '../../components/HomeNoticebar'
import { storeObjectEnum, requestDefaultTime } from '../../config';
import { getRandomIndex } from '../../utils/random';
import { AtModal, AtToast, AtModalContent, AtModalAction, AtButton } from '../../uiComponent';
import Loading from '../../uiComponent/loading';
import Detail from '../../components/Detail';



export default class Index extends Component {
  state = {
    extractType: null,
    modalOpen: false,
    loading: false,
    toastVisible: false,
    detailVisible: false,
    detailValue: {}
  }

  isExtract = type => {
    this.setState({
      modalOpen: true,
      extractType: type
    });
  }
  //随机抽取男生或女生资料
  random = () => {
    const startNow = Date.now();
    this.setState({ modalOpen: false, loading: true })
    const { extractType: type } = this.state;
    queryAll(storeObjectEnum[type]
    ).then(res => {
      const endNow = Date.now();
      this.setState({
        extractType: null
      })
      setTimeout(() => {
        const index = getRandomIndex(res.length);
        this.setState({
          detailVisible: true,
          detailValue: res[index]
        })
      }, requestDefaultTime - (endNow - startNow))
    }).catch(err => {
      console.log(err)
      this.setState({ toastVisible: true });
    }).finally(() => {
      const endNow = Date.now();
      setTimeout(() => {
        this.setState({ loading: false });
      }, requestDefaultTime - (endNow - startNow))
    })
  }

  //进入页面开启弹幕定时器
  componentDidShow() {
    this.noticebar?.startTimer();
  }

  //离开页面清除弹幕的定时器，让他停止
  componentDidHide() {
    this.noticebar?.clearTimer();
  }

  render() {
    const { modalOpen, loading, toastVisible, detailVisible, detailValue } = this.state;
    return (
      <View className={'index_page'}>
        {loading && <Loading />}
        <AtToast isOpened={toastVisible} text={'抽取失败，请稍后重试'}
          onClose={() => this.setState({ toastVisible: false })}></AtToast>
        <View className={'banner'}>
          <Swiper 
          indicatorActiveColor='#3e78ed'
          indicatorColor='#eeeeee'
          autoplay
          indicatorDots
          >
            <SwiperItem>
              <Image  src={require('../../images/banner1.png')} />
            </SwiperItem>
            <SwiperItem>
              <Image  src={require('../../images/banner2.png')} />
            </SwiperItem>
          </Swiper>
        </View>
        <HomeNoticebar ref={e => this.noticebar = e} />
        <AtModal isOpened={detailVisible} closeOnClickOverlay={false}>
          <AtModalContent>
            <Detail value={detailValue}/>
          </AtModalContent>
          <AtModalAction>
            <AtButton onClick={() => {
              this.setState({ detailVisible: false })
            }} className={'detail_button'}>我知道了</AtButton>
          </AtModalAction>
        </AtModal>
        <AtModal
          closeOnClickOverlay={false}
          isOpened={modalOpen}
          title='您确定要抽取吗'
          cancelText='取消'
          confirmText='确认'
          onCancel={() => this.setState({ modalOpen: false })}
          onConfirm={this.random}
          content='准备好了 要开始了呦~ 心动时刻'
        />
        <View className="title">随机匹配</View>
        <View className={'random_select'}>
          <View className={'one'}>
            <View className={'random_man'} onClick={() => this.isExtract('0')}>
              <View>
                <View>抽取资料</View>
                <View>剩余：1123</View>
              </View>
              <View>
                <Image src={require('../../images/boy_icon.png')} />
              </View>
            </View>
            <View className={'random_woman'} onClick={() => this.isExtract('1')}>
              <View>
                <View>抽取资料</View>
                <View>剩余：1123</View>
              </View>
              <View>
                <Image src={require('../../images/girl_icon.png')} />
              </View>
            </View>
          </View>
        </View>
        <View className={'desc'}>
          随着互联网时代的飞速发展，相信您也厌倦了传统的交友方式，我们的《小新恋爱》就是一款为年轻人打造的全新交友软件，用户通过软件能够选择自己
          喜欢的社区，和社区中的用户一起交流沟通，不论是新闻八卦还是感情问题都可以和大家分享，全新的社交方式能够让您认识更多的新朋友。相遇使我们有故事~
        </View>
        <View className={'put_button'}
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/addPage/index'
            });
          }}
        >
          投放资料
        </View>
      </View>
    )
  }
}
