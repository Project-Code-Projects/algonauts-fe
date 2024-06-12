import { baseApi } from "./api/baseApi";
import notificationsReducer from './slices/notficationsSlices';

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  notifications: notificationsReducer,
};

/*

Setting the path for other reducers

*/
