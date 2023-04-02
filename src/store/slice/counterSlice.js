import { createSlice } from "@reduxjs/toolkit";
import { Toast } from 'antd-mobile';


const counterSlice = createSlice({
  name: "arrCommodity",
  // 初始化数据
  initialState: {
    value: []
  },
  // 修改数据的逻辑
  reducers: {
    getShop(state, { payload }) {
      if (!state?.value.some(item => item?.name === payload?.name)) {
        state?.value.push(payload);
        // 轻提示(组件)
        Toast.show({
          content: '添加成功',
        });
      } else {
        Toast.show({
          content: '该商品已经存在购物车中,请勿重复添加',
        });
      }
    },

    getNum(state, { payload }) {
      state.value[payload[1]].buyAddNum =payload[0]
    }
  }

  // 添加到购物车

});

// 导出修改方法给组件使用
export const { getShop, getNum } = counterSlice.actions;
// 导出给初始化store
export default counterSlice.reducer;