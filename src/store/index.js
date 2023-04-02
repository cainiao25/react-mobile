import { combineReducers, configureStore, getDefaultMiddleware, MiddlewareArray } from "@reduxjs/toolkit"
import counterReducer from './slice/counterSlice.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// const store =configureStore({
//   reducer:{
//     counter:counterReducer
//   }
// })
// export default store


//在localStorge中生成key为root的值
const config = {
  key: 'root',
  storage,
  // blacklist:['loading'] //设置某个reducer数据不持久化
}

//数据持久化处理
const persistReducers = persistReducer(config, combineReducers({
  counter: counterReducer
}));
const store = configureStore({
  reducer: persistReducers,
  // 解决检测到非序列化的数据的报错

  // 方法一
  //redux-persist的数据保存方式
  //把数据以键值对的方式保存在local storage中，而真正储存的数据是stringfy以后的字符串，
  // 当我们需要使用的时候再把string从local storage中取出来，然后再转化为对象。既然保存的数据是string，所以会有这个报错。
  //改正方法：
  //在 getDefaultMiddleware 参数中设置 serializableCheck 为 false，报错
  
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false })


  // 方法二
  //因为redux-persist定义的action中的payload包含函数类型, 
  //redux建议payload是可序列化的。直接忽略persist的type就可以消除这个报错
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //忽略 persist 的序列化警告
        ignoredActions: ['persist/PERSIST']
      }
    })
});

const persistor = persistStore(store);
export { store, persistor }