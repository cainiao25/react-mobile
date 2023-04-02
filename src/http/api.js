import { services } from '.'

// 接口1, 请求首页数据
export async function getHome() {
  return await services.post('/api/root-ceo-content/hpPageConfigure/pageList',
    {
      channelId: null,
      memberKey: ""
    })
}

// 请求分类页面左侧商品栏数据
export function getClassification() {
  return services.post('/root-ceo-commodity/categoryApi/categoryList',
    {
      channelId: null,
      isWholeSale: 0
    }
  )
}

// 请求分类页面右侧商品数据
export function getcommoditiesByCategory({ catKey }) {
  return services.post('/root-ceo-commodity/categoryApi/commoditiesByCategory',
    // { catKey }
    {
      catKey,
      ceoStatus: 0,
      channelId: null,
      memberKey: "",
      page: 1,
      pageSize: 1000,
    }
  )
}

// 请求商品详情页数据
export function getCommodityDetails({ ptKey }) {
  return services.post('/root-ceo-commodity/commodityApi/commodityDetail',
    {
      ptKey,
      isWholeSale: 0,
      channelId: null,
      memberKey: "",
    }
  )
}
///root-ceo-order/member/cartApi/inventory
// 请求增加猜你喜欢的商品数据
export function getYouLikeShop({ page }) {
  return services.post('/root-ceo-commodity/commodityApi/commodityMore',
    {
      page,
      isWholeSale: 0,
      channelId: null,
      memberKey: "",
    }
  )
}

//购物车数据
export function getShopList(  ) {
  return services.post('/root-ceo-order/member/cartApi/inventory',
    {
      channelId: "C06022632001",
      isWholeSale: 0,
      items:3645
    }
  )
}


