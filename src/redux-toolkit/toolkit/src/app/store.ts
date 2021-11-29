/**
 * configureStore() 包装createStore 提供简化的配置和良好的默认值
 * createReducer() 
 * createAction() 
 * createAlice() 接收一个reducer函数对象、一个切片名称和一个初始值状态 生成一个带有相应动作创建者和动作类型的切片reducer
 * createAsyncThunk 接收一个动作类型字符串和一个返回Promise的函数
 * createEntityAdapter 生成一组可重用的reducer和selectors来管理store中的规范化数据
 */


/**
 * RTK查询
 * 高级数据获取和缓存工具，解决数据获取和缓存的用例
 * import { createApi } from '@reduxjs/toolkit/query'
 * 
 * createApi() 核心 定义一组端点，描述如何从一系列端点检索数据，包括如何获取和转换该数据的配置
 * featchBaseQuery() 简化请求
 * <ApiProvider /> 
 * setupListeners() 
 */

/**
 * 使用过程
 * 1.创建一个Redux状态存储器，configureStore
 * 2.为React应用程序组件提供Redux存储，<Provider store={store}>
 * 3.创建Redux切片 reducer createSlice
 * 4.使用useSelector/useDispatch在React组件中使用React-Redux钩子
 */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterSlice from '../features/counter/counterSlice'