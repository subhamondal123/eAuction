import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import styles from "./Style";
import { Color, Dimension, ImageName } from "../../enums";
import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  DateConvert,
  storageDataModification,
} from "../../services/common-view-function";
import { Toaster } from "../../services/common-view-function";
import { CommonData, ErrorCode } from "../../services/constant";
import { Loader, NoDataFound } from "../../shared";
import { App_uri } from "../../services/config";
import Header from "../header";
import { modifyAuctioneerLiveList } from "./Function";
import { CustomStyle } from "../style";

// this is auction list page
class MyActionListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveAuctionList: [],
      listLoader: true,
      totalDataCount: 0,
      pageNum: 0,
      limit: 10,
      refreshing: true,
      pageLoader: true,
      userData: {},
      firstDate: "",
      lastDate: "",
      liveDetailsShowHide: false,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is first function where set state data
  _load = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    this.setState({
      userData: userData,
    });
    this.getCurrentMonthFirstDateLastDate();

    await this._apiCallRes();
  };

  getCurrentMonthFirstDateLastDate = () => {
    let mainDate = DateConvert.getCurrentMonthFirstAndLastDate();
    this.state.firstDate = mainDate.firstDate;
    this.state.lastDate = mainDate.lastDate;
    this.setState({
      firstDate: this.state.firstDate,
      lastDate: this.state.lastDate,
    });
  };
  // for navigate to previous screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  // for Action List Api Call
  _apiCallRes = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    this.setState({ refreshing: false });
    let dataReq = {
      limit: this.state.limit.toString(),
      offset: (this.state.pageNum * this.state.limit).toString(),
      clientid: userData.clientid,
      userid: userData.id,
      status: [32, 37],
      roleid: userData.roleId,
      templateid: 1,
      enddate: this.state.lastDate,
      startdate: this.state.firstDate,
    };
    let responseData = await MiddlewareCheck(
      "myActionList",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let auctioneerLiveList = await modifyAuctioneerLiveList(responseData);
        this.setState({
          liveAuctionList: [
            ...this.state.liveAuctionList,
            ...auctioneerLiveList.auctioneerLiveList,
          ],
          totalDataCount: auctioneerLiveList.totalCount,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({
      pageLoader: false,
      listLoader: false,
    });
  };
  //
  _openDetailsPage = (item, key) => {
    this.props.navigation.navigate("MyActionListDetails", {
      data: item,
      status: 6,
      key: key.toString().length > 1 ? key + 1 : "0" + (key + 1),
      onReloadPage: this.onRefresh,
    });
  };

  _onShowHide = () => {
    this.setState({
      liveDetailsShowHide: !this.state.liveDetailsShowHide,
    });
  };
  // for fetch more data
  fetchMore = async () => {
    if (this.state.listLoader) {
      return null;
    }
    this.setState(
      (prevState) => {
        return { listLoader: true, pageNum: prevState.pageNum + 1 };
      },
      () => {
        if (this.state.liveAuctionList.length >= this.state.totalDataCount) {
          this.setState({ listLoader: false });
          return null;
        } else {
          this._load();
        }
      }
    );
  };

  onRefresh = async () => {
    this._onStateReset();
    await this._apiCallRes();
  };

  _onStateReset = async () => {
    this.setState({
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      liveAuctionList: [],
      refreshing: true,
      listLoader: true,
      pageLoader: true,
    });
  };
  // for render activity loader
  renderLoader = () => {
    return this.state.listLoader ? (
      <View style={styles.activityLoad}>
        <ActivityIndicator
          size="large"
          color={Color.COLOR.INDICATOR_COLOR.GRAY}
        />
      </View>
    ) : (
      <View style={{ marginBottom: 250 }} />
    );
  };
  // for render contact list data
  renderContactList = (item) => {
    return (
      <View>
        <View style={{ flex: 1, marginHorizontal: "2%" }}>
          {this.dataList(item.item, item.index)}
        </View>
      </View>
    );
  };
  // for render list data
  dataList = (item, key) => {
    return <View style={styles.contactInfo}>{this.ListData(item, key)}</View>;
  };

  _timeOut = (param1, param2) => {
    let arr = this.state.liveAuctionList;
    arr.splice(param2, 1);

    this.state.liveAuctionList = arr;
    this.setState({
      liveAuctionList: this.state.liveAuctionList,
    });
  };
  // for design list data section
  ListData = (item, key) => {
    return (
      <View style={styles.mainBox}>
        <TouchableOpacity
          style={styles.subBox}
          activeOpacity={0.8}
          onPress={() => this._openDetailsPage(item, key)}
        >
          <View style={styles.BoxMarginSec}>
            <View style={styles.violetSmallBox}>
              <Text style={styles.numberText}>
                {key.toString().length > 1 ? key + 1 : "0" + (key + 1)}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.columnSec}>
                <Text style={styles.auctionText}>{item.primevalue}</Text>
                {/* <Text style={styles.auctionTypeText}>{item.}</Text> */}
              </View>
              <View style={styles.dateSec}>
                <View style={styles.dateSubSec}>
                  <View style={styles.skyNumberTextCircel} />
                  <View style={styles.stateEndDate}>
                    <Text style={styles.skySecDateText}>{item.startDate}</Text>
                    <Text style={styles.skySectimeText}>{item.startTime}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // for design list header section
  listHeaderSection = () => {
    return (
      <View style={{}}>
        <TouchableOpacity onPress={() => this._onBack()}>
          <Image source={ImageName.BACK_LOGO} style={styles.backImg} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    );
  };

  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header {...this.props} />
        <View style={styles.space}>
          {this.listHeaderSection()}
          {this.state.pageLoader ? (
            <View style={styles.loaderSec}>
              <Loader />
            </View>
          ) : (
            <React.Fragment>
              {this.state.liveAuctionList.length > 0 ? (
                <React.Fragment>
                  <FlatList
                    data={this.state.liveAuctionList}
                    renderItem={(item, key) =>
                      this.renderContactList(item, key)
                    }
                    keyExtractor={(item, key) => key}
                    onEndReached={this.fetchMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderLoader}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                  />
                  <View style={{ height: 300 }} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <View style={CustomStyle.noDataFoundViewForTabList}>
                    <NoDataFound height={80} width={110} />
                  </View>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { SRMBAuctionRedux } = state;
  return { SRMBAuctionRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
      stateUserInformation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyActionListPage);
