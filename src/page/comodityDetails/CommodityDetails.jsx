import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { getCommodityDetails, getYouLikeShop } from '../../http/api'
import { Space, Swiper, Button, InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import './CommodityDetails.css'
import peopleserved from '../../img/客服.png'
import ShoppingCart from '../../img/购物车.png'
import { getShop } from '../../store/slice/counterSlice';
import { useSelector, useDispatch } from 'react-redux';



//商品详情页
export const CommodityDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //组件部分
  //无限滚动组件数据 ( roll )
  const [roll, setRoll] = useState([])
  const [hasMore, setHasMore] = useState(true)

  async function loadMore() {
    const res = await getYouLikeShop({ page: page.current++ });
    setRoll([...roll].concat(res.data.data.templateList))
  }

  const page = useRef(1)
  const location = useLocation();
  const [top, setTop] = useState()
  const [imgDetails, setImgDetails] = useState([])
  const [data, setData] = useState([])
  const [msg, setMsg] = useState()

  //渲染商品
  const items = top?.map((item, index) => (
    <Swiper.Item key={index}>
      <div className='content' >
        <img src={item} alt="" />
      </div>
    </Swiper.Item>
  ))

  //详情页接口
  useEffect(() => {
      getrouter(location.state.ptkey)
  }, [msg])


  function getrouter(ptKey) {
    setMsg(ptKey)
    getCommodityDetails({ ptKey:ptKey })
      .then(res => {
        setTop(res.data.data.templateInfo.bannerImages.split(','))
        setData(res.data.data.templateInfo)
        setMsg(res.data.data.templateInfo.ptKey)
        setImgDetails(res.data.data.templateInfo.detailImages.split(','))
        
      })
  }

  function fn(ptkey, pathname) {
    // navigate(pathname, { state: { ptkey } })
    // location.state.ptkey
    // getrouter(ptkey)
  }

  return (
    <div id="CommodityDetails-wrap" className="flex column">
      <div className="">
        <Space direction='vertical' block  >
          <Swiper height='400px' autoplay loop
            indicator={(total, current) => (
              <div className='customIndicator'>
                {`${current + 1} / ${total}`}
              </div>
            )}
          >
            {items}
          </Swiper>
        </Space>
        <div className="flex">
          <p className="flex">开通旺旺会员,购买立省6元</p>
        </div>
        <div className="CommodityDetails-money">
          <div className="flex column">
            <div className="flex ">
              <p>￥{data.origPrice}/{data.unit}</p>
              <p>￥{data.supplyPrice}</p>
              <div>
                <img src="https://hotkidceo-1251330842.file.myqcloud.com/static/integral/two-member.png" alt="" />
              </div>

            </div>
            <div className="ys">
              <p>已售：{data.sold}{data.unit}</p>
            </div>
            <div>
              <p>{`${data?.commodityBatchList?.[0].name}${data?.commodityBatchList?.[0].flavour}${data?.commodityBatchList?.[0].spec}`}</p>
            </div>
            <div>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
        {/* 商品的相关图片 */}
        <div className="CommodityDetails-shopimg flex column">
          <h3>商品详情</h3>
          <div className="CommodityDetails-img flex column">
            {
              imgDetails.map((item, i) => {
                return (
                  <div key={i} className='flex'>
                    <img width='100%' src={item} alt="" />
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* 猜你喜欢 */}
        <div className="guess-shop flex">
          <p>-- 猜你喜欢 --</p>
        </div >
        {/* 刷新猜你喜欢商品数据 */}
        <div className="CommodityDetails-shopList">
          {
            roll?.map((item, i) => {
              return (
                <div key={i}>
                  <h4>{item.name}</h4>
                  <img onClick={() => { fn(item.ptKey, '/page/CommodityDetails') }} width='100%' src={item.listImages} alt="" />
                </div>
              )

            })
          }
        </div>
        <InfiniteScroll loadMore={loadMore} hasMore={true} threshold={0} />
      </div>
      <div className="CommodityDetails-foot flex">
        <div className="flex column">
          <img width='20px' src={peopleserved} alt="" />
          <p>客服</p>
        </div>
        <div className="flex column">
          <img width='20px' src={ShoppingCart} alt="" />
          <p>购物车</p>
        </div>

        <button onClick={() => { dispatch(getShop(data)) }}>加入购物车</button>

      </div>
    </div>

  )
}