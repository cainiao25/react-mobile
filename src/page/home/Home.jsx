import { Swiper } from 'antd-mobile'
import { useEffect, useState } from "react"
import { getHome } from '../../http/api'
import { useLocation, useNavigate, } from 'react-router-dom';
import logo from '../../img/放大镜.png'
import './Home.css'
import { Foot } from '../../conpoment/Foot';
import { getShop } from '../../store/slice/counterSlice';
import { useSelector, useDispatch } from 'react-redux';


export const Home = () => {
  const dispatch = useDispatch();
  const arrcommodity = useSelector((state) => state.counter?.value);
  // const { pathname } = useLocation();
  const navigate = useNavigate()
  const [arr, setArr] = useState([])

  const items = arr[1]?.configureAttribute?.map((item, i) => (
    <Swiper.Item key={i}>
      <img className='nav-top' src={arr[1]?.configureAttribute[i]?.pictureURL} alt="" />
    </Swiper.Item>
  ))

  useEffect(() => {
    getHome()
      .then(res => {
        setArr(res.data.data)
        
      })
  }, [])
  console.log(arr,'arr');
  function fn(ptkey, pathname) {
    navigate(pathname, { state: { ptkey } })
    // console.log(pathname, '详情')
    // console.log(ptkey, '商品id')
  }

  
  return (
    <>
      <div className="contents ">
        <h3>旺仔旺铺</h3>
        <div className="wrap-center flex column">
          <div className="input flex">
            <img className="logo" src={logo} alt="" />
            <input type="text" placeholder="旺旺碎冰冰" />
          </div>
          {/* 1 轮播图 */}
          <Swiper autoplay loop>{items}</Swiper>
          {/* 2 频道导航 */}
          <div className='food-nav flex column'>
            {
              arr[2]?.configureAttribute.map((item, i) => {
                return (
                  <div key={i} className='flex column'>
                    <img src={arr[2].configureAttribute[i].pictureURL} alt="" />
                    <p>{arr[2].configureAttribute[i].pictureName}</p>
                  </div>
                )
              })
            }
          </div>
          {/* 3 新人专区 */}
          <div className='new-people-1 '>
            <img src={arr[3]?.configureAttribute[0].pictureURL} alt="" />
          </div>
          {/* 4 活动 */}
          {/* <div className='new-people-2'>
            <img src={arr[4]?.configureAttribute[0].pictureURL} alt="" />
          </div> */}
          {/* 5 秒杀 */}
          <div className='seckill'>
            <img src={arr[4]?.pictureURL} alt="" />
          </div >
          {/* 6 优惠券（3宫格） */}
          <div className='coupon flex'>
            {
              arr[5]?.configureAttribute?.map((item, i) => {
                return (
                  <img key={i} src={arr[5].configureAttribute[i]?.pictureURL} alt="" />
                )
              })
            }
          </div>
          {/* 7 首页魔方1（4宫格） */}
          <div className='Quadrangle flex column'>
            {
              arr[6]?.configureAttribute?.map((item, i) => {
                return (
                  <div key={i}>
                    <img src={arr[6]?.configureAttribute[i]?.pictureURL} alt="" />
                  </div>
                )
              })
            }
          </div>
          {/* 8 旺铺消息 */}
          <div className='shop-message flex'>
            <div className='flex'>
              <h4>旺铺消息</h4>
              <p>部分地区快递停发公告</p>
            </div>
          </div>
          {/* 9 为你推荐 */}
          <div className='recommend flex'>
            <img src={arr[8]?.configureAttribute[0].pictureURL} alt="" />
          </div>
          {/* 9 商品列表 */}
          <div className='shop-list flex' >
            <div className='shop-left flex column' >
              {
                arr[9]?.configureAttributeList?.map((item, i) => {
                  return (
                    <div key={i} className='shop flex column' onClick={() => { fn(arr[9]?.configureAttributeList[i][0]?.ptKey, '/page/CommodityDetails') }}>
                      <div >
                        <img src={arr[9]?.configureAttributeList[i][0]?.listImages} alt="" />
                      </div>
                      <div className='shop-bottom flex column'>
                        <div>
                          <img src="https://hotkidceo-1251330842.file.myqcloud.com/static/home/gift.png" alt="" />
                        </div>
                        <p>{arr[9]?.configureAttributeList[i][0]?.name}</p>
                        <span>{arr[9]?.configureAttributeList[i][0]?.displayName}</span>
                        <div className='flex shop-button'>
                          <span>{arr[9]?.configureAttributeList[i][0]?.origPrice}</span>
                          <img onClick={() => { dispatch(getShop(arr[9]?.configureAttributeList[i][0])) }} src="https://hotkidceo-1251330842.file.myqcloud.com/static/new/new_shopCart1.png" alt="" />
                        </div>
                        <span>{arr[9]?.configureAttributeList[i][0]?.supplyPrice}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='shop-right'>
              {
                arr[9]?.configureAttributeList?.map((item, i) => {
                  return (
                    <div key={i} className='shop flex column' >
                      <div onClick={() => { fn(arr[9]?.configureAttributeList[i][1]?.ptKey, '/page/CommodityDetails') }}>
                        <img src={arr[9]?.configureAttributeList[i][1]?.listImages} alt="" />
                      </div>
                      <div className='shop-bottom flex column'>
                        <div>
                          <img src="https://hotkidceo-1251330842.file.myqcloud.com/static/home/gift.png" alt="" />
                        </div>
                        <p>{arr[9]?.configureAttributeList[i][1]?.name}</p>
                        <span>{arr[9]?.configureAttributeList[i][1]?.displayName}</span>
                        <div className='flex shop-button'>
                          <span>{arr[9]?.configureAttributeList[i][1]?.origPrice}</span>
                          <img onClick={() => { dispatch(getShop(arr[9]?.configureAttributeList[i][1])) }} src="https://hotkidceo-1251330842.file.myqcloud.com/static/new/new_shopCart1.png" alt="" />
                        </div>
                        <span>{arr[9]?.configureAttributeList[i][1]?.supplyPrice}</span>

                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>

  )
}

