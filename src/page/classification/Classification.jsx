import { useState, useEffect } from 'react'
import { SideBar } from 'antd-mobile'
import './Classification.css'
import { getClassification, getcommoditiesByCategory } from '../../http/api'
import axios from 'axios'
import { Foot } from '../../conpoment/Foot'
import { useNavigate } from "react-router-dom"
import { getShop } from '../../store/slice/counterSlice';
import { useSelector, useDispatch } from 'react-redux';



// Classification 分类
export const Classification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [arr, setArr] = useState([])
  const [shop, setShop] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const tabs = []

  useEffect(() => {
    getClassification()
      .then(res => {
        setArr(res.data.data.categoryInfo)
      })
  }, [])

  useEffect(() => {
    getcommoditiesByCategory({ catKey: activeKey })
      .then(res => {
        setShop(res.data.data.commodityInfo)
      })
  }, [activeKey])

  arr.map((item, i) => {
    tabs.push({
      key: item.code,
      title: item.displayName,
    })
  })

  //获取商品对应数据
  function getCart(item) {
    let shop = {
      name: item.name,
      listImages: item.template.listImages,
      origPrice: item.template.origPrice,
      displayName: item.template.displayName,
      buyAddNum: item.template.buyAddNum,
    }
    console.log(shop,'shop');
    dispatch(getShop(shop))
  }

  function fn(ptkey, pathname) {
    navigate(pathname, { state: { ptkey } })
  }
  return (
    <>
      <div className=' wrap flex'>
        <div className='flex'>
          <SideBar defaultActiveKey={'1'} onChange={setActiveKey}>
            {tabs.map((item, i) => (
              <SideBar.Item
                className='2'
                key={arr[i].code}
                title={item.title}
              />
            ))}
          </SideBar>
        </div>
        <div id='shop-top' className='flex'>
          <div className='Classification-shop '>
            {
              shop?.map((item, i) => {
                return (
                  <div key={i} className='list-shop flex' >
                    <div className='left-shop' >
                      <div onClick={() => { fn(shop[i]?.template?.ptKey, '/page/CommodityDetails') }}>
                        <img src={item?.template?.listImages} alt="" />
                      </div>
                    </div>
                    <div className='right-shop'>
                      <p>{item.name}</p>
                      <div>
                        <span>{item.template.displayName}</span>
                      </div>
                      <div className='mz'>
                        <img src="https://hotkidceo-1251330842.file.myqcloud.com/static/home/gift.png" alt="" />
                      </div>
                      <div className='add-to-cart flex'>
                        <div className='flex'>
                          <p>￥{item.template.retailPrice}</p>
                          <p>￥{item.template.supplyPrice}</p>
                          <div>
                            <img src="https://hotkidceo-1251330842.file.myqcloud.com/static/integral/two-member.png" alt="" />
                          </div>
                        </div>
                        <div>
                          <img onClick={() => { getCart(item) }} src="https://hotkidceo-1251330842.file.myqcloud.com/static/new/new_shopCart1.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className='gz'></div>
          </div>
        </div>
      </div>
      <Foot />
    </>

  )
}