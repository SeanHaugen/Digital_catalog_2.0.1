// src/redux/reducers/recentlyViewedReducer.js
const recentlyViewedReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECENTLY_VIEWED_ITEM":
      // Add logic to avoid duplicates, limit the list length, etc.
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default recentlyViewedReducer;
