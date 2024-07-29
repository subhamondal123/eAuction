import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { createStore } from "redux";
import SRMBAuctionReducer from './src/redux/SRMBAuctionReducer';
import {
  SplashScreen,
  Header,
  RoleLogIn,
  LogInPage,
  AuctionDashboard,
  VendorDetails,
  LiveUpcomingOpenList,
  ChangePassword,
  AuctioneerLiveListPage,
  AuctioneerUpcomingListPage,
  AuctioneerOpenListPage,
  ListOfBidder,
  AuctioneerListDetails,
  BidderLiveListPage,
  BidderUpcomingListPage,
  BidderOpenListPage,
  BidderListDetails,
  NetworkError,
  MyActionListPage,
  MyActionListDetails,
  NewVersionAvailable,
  Notification,
  CreateAuction
} from './src/screens';
import socketServices from './src/services/api/models/socketService';

// const socket = io(App_uri.SOCKET_ROOT, {

//   'secure':true,
//   'reconnection': true,
//   'autoConnect':true,
//   'reconnectionDelay': 2000,
//   'reconnectionAttempts': Infinity,
//   'transports':  [ "polling","websocket"] ,
// });


socketServices.initializeSocket();

const store = createStore(SRMBAuctionReducer);

const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount = () => {
    
  }
  render() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RoleLogIn" component={RoleLogIn} options={{ headerShown: false }} />
            <Stack.Screen name="LogInPage" component={LogInPage} options={{ headerShown: false }} />
            <Stack.Screen name="AuctionDashboard" component={AuctionDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="AuctioneerLiveListPage" component={AuctioneerLiveListPage} options={{ headerShown: false }} />
            <Stack.Screen name="AuctioneerUpcomingListPage" component={AuctioneerUpcomingListPage} options={{ headerShown: false }} />
            <Stack.Screen name="AuctioneerOpenListPage" component={AuctioneerOpenListPage} options={{ headerShown: false }} />

            <Stack.Screen name="ListOfBidder" component={ListOfBidder} options={{ headerShown: false }} />
            <Stack.Screen name="AuctioneerListDetails" component={AuctioneerListDetails} options={{ headerShown: false }} />
            <Stack.Screen name="BidderLiveListPage" component={BidderLiveListPage} options={{ headerShown: false }} />
            <Stack.Screen name="BidderUpcomingListPage" component={BidderUpcomingListPage} options={{ headerShown: false }} />
            <Stack.Screen name="BidderOpenListPage" component={BidderOpenListPage} options={{ headerShown: false }} />
            <Stack.Screen name="BidderListDetails" component={BidderListDetails} options={{ headerShown: false }} />
            <Stack.Screen name="MyActionListPage" component={MyActionListPage} options={{ headerShown: false }} />
            <Stack.Screen name="MyActionListDetails" component={MyActionListDetails} options={{ headerShown: false }} />
            <Stack.Screen name="NetworkError" component={NetworkError} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAuction" component={CreateAuction} options={{ headerShown: false }} />

            <Stack.Screen name='NewVersionAvailable' component={NewVersionAvailable} options={{ headerShown: false }} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;