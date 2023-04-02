import { useRoutes } from "react-router-dom";
import { Home } from "../page/home/Home";
import { Classification } from '../page/classification/Classification'
import { Member } from '../page/member/Member'
import { ShoppingCart } from '../page/shoppingCart/ShoppingCart'
import { My } from '../page/my/My'
import { CommodityDetails } from '../page/comodityDetails/CommodityDetails.jsx'

// 一级路由配置
const routes = [
  {
    path: '/',
    element: <Home />
  }, {
    path: '/classification',
    element: <Classification />
  }, {
    path: '/member',
    element: <Member />
  }, {
    path: '/shoppingcart',
    element: <ShoppingCart />
  }, {
    path: '/My',
    element: <My />
  }, {
    path: '/page/CommodityDetails',
    element: <CommodityDetails />
  }
];


export default function () {
  return useRoutes(routes)
}
