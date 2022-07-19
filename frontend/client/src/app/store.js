import { configureStore } from "@reduxjs/toolkit";
import vaccineReducer from "../feature/vaccine/vaccineSlice";
import addressReducer from "../feature/address/addressSlice";
import userReducer from "../feature/user/userSlice";
import centerReducer from "../feature/center/centerSlice";
import registrationReducer from "../feature/registration/registrationSlice";
import cartReducer from "../feature/cart/cartSlice";
const store = configureStore({
  reducer: {
    vaccine: vaccineReducer,
    address: addressReducer,
    user: userReducer,
    center: centerReducer,
    registration: registrationReducer,
    cart: cartReducer,
  },
});
export default store;
