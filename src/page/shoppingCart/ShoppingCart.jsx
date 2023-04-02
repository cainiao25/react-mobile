import { useState, useEffect } from "react"
import { Foot } from "../../conpoment/Foot"
import { getCommodityDetails, getShopList } from "../../http/api"
import { useSelector, useDispatch } from "react-redux";
import './ShoppingCart.css'
import { Stepper } from 'antd-mobile'
import { getNum } from "../../store/slice/counterSlice";


export const ShoppingCart = () => {
  const arrcommodity = useSelector((state) => state.counter?.value);
  console.log(arrcommodity, 'arrcommodity')
  const dispatch = useDispatch();
  const [arr, setArr] = useState(arrcommodity)
  const [data, setData] = useState([])
  const [numvalue, setNumvalue] = useState([])
  const [allmoney, setAllmoney] = useState()
  // const [ flag, setFlag ] =useState(true)

  // ([ value, i] ) => { setNumvalue([value, i]) }
  // arr.map((item, i) => {
  //   let allmoney = item.origPrice * item.buyAddNum
  // })

  // for(let i =0;i<arr.lenght;i++){
  //   arr.origPrice * arr.buyAddNum
  // }
  function fn() {
    console.log(arr, 'arrcommodity00000')
  }
  // arrcommodity.map((item, i) => {
    
  // })
  //向数组对象中添加属性
  arrcommodity.forEach(item => {
    // item.flag = true;
})

  let flag = true
  function allclick(e) {
    // flag = e.target.checked
  }
  function setFlag() {
    // flag = false
  }
  function num(value) {
    console.log(value[0], 'value');
    console.log(value[1], 'i');
    dispatch(getNum(value))
  }
  return (
    <>
      <div className='ShoppingCart-contents'>
        <div className="ShoppingCart-shopList">
          {/* 单个商品 */}
          {
            arr?.map((item, i) => {
              return (
                <div key={i} className="ShoppingCart-shop flex">
                  <div className="flex">
                    <input type="checkbox"  onChange={(e) => { setFlag(e, i) }} />
                  </div>
                  <div className="CartShop-left-img flex">
                    <div>
                      <img height='100%' src={item?.listImages} alt="" />
                    </div>
                  </div>
                  <div className="CartShop-right-img">
                    <div>
                      <p>{item?.name}</p>
                    </div>
                    <div>
                      <p>{item?.displayName}</p>
                    </div>
                    <div className="flex">
                      <div>
                        <p>￥{item?.origPrice}</p>
                      </div>
                      <Stepper min={0} defaultValue={item?.buyAddNum} onChange={(value) => { num([value, i]) }} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* 结算部分 */}
      <div className="ShoppingCart-Closing flex">
        <div className="flex">
          <input type="checkbox" />
          <p onClick={ allclick}>已选()</p>
        </div>
        <div className="flex">
          <div className="flex">
            <p>合计:</p>
            <p>￥{ }</p>
          </div>
          <button onClick={fn}>去结算{ }</button>
        </div>
      </div>
      <Foot />
    </>
  )
}