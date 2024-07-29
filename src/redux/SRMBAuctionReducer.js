import { combineReducers } from "redux";

const INITIAL_STATE = {
  deviceId: "",
  networkCheckState: "",
  allCountries: [],
  userInfo: {}
};

const SRMBAuctionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DEVICEID":
      state.deviceId = action.payload;
      return state;

    case "SET_STATE_CHECK_FOR_NETWORK":
      state.networkCheckState = action.payload;
      return state;

    case "SET_ALL_COUNTRIES":
      state.allCountries = action.payload;
      return state;

    case "SET_USER_INFORMATION":
      state.userInfo = action.payload;
      return state;


    default:
      return state;
  }
};

export default combineReducers({
  SRMBAuctionRedux: SRMBAuctionReducer,
});
