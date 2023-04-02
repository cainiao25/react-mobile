import React from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useNavigate, } from 'react-router-dom';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import vip from '../img/VIP.png'
import { ReceiptOutline } from 'antd-mobile-icons'

export const Foot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/classification',
      title: '分类',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/member',
      title: '会员',
      icon: <img className='logo' src={vip} alt="" />,
    },
    {
      key: '/shoppingcart',
      title: '购物车',
      icon: <ReceiptOutline />
    },
    {
      key: '/My',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  function changePage(value) {
    navigate(value)
    // console.log(value, 'value')
  }

  return (
    <TabBar activeKey={pathname} onChange={value => changePage(value)}>
      {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title} />))}
    </TabBar>
  );
};