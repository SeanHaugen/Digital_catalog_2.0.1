// src/redux/store.js
import { createStore } from "redux";
import recentlyViewedReducer from "./RecentlyViewedReducer";

const store = createStore(recentlyViewedReducer);

export default store;
