import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import styles from "./Style";
import {
  AlertMessage,
  Color,
  Dimension,
  FontFamily,
  FontSize,
  ImageName,
} from "../../enums";
import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../redux/SRMBAuctionAction";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { CustomStyle } from '../../../style';
import { DateConvert, FileDownload } from "../../services/common-view-function";
import { Toaster } from "../../services/common-view-function";
import { CommonData, ErrorCode } from "../../services/constant";
import { inputEmptyValidator } from "../../validators/dataValidator";
import {
  BigTextButton,
  CalenderModal,
  CheckBox,
  Loader,
  Modal,
  NoDataFound,
} from "../../shared";
import { App_uri } from "../../services/config";
import Header from "../header";

let staticData = [
  {
    id: 1,
    headerText: "Tearms Titel",
    subText:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 2,
    headerText: "Tearms Titel",
    subText:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 3,
    headerText: "Tearms Titel",
    subText:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 4,
    headerText: "Tearms Titel",
    subText:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 5,
    headerText: "Tearms Titel",
    subText:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
];
// this is live upcoming open list page
class LiveUpcomingOpenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandingList: [],
      listLoader: true,
      totalDataCount: 0,
      pageNum: 0,
      limit: 10,
      refreshing: true,
      pageLoader: false,

      showHide: true,
      tearmsConditionData: [],
      tearmsConditionModal: false,
    };
  }

  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is first function where set state data
  _load = async () => {
    this.setState({
      submitLoader: false,
      tearmsConditionData: staticData,
    });
    await this._apiCallRes();
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  _apiCallRes = async () => {
    // this.setState({ refreshing: false });
    // let dataReq = {
    //     "limit": this.state.limit.toString(),
    //     "offset": (this.state.pageNum * this.state.limit).toString(),
    //     "searchText": this.state.nameNumberText,
    //     "searchDate": this.state.selectedFilterDate
    // }
    // let responseData = await MiddlewareCheck("getPoList", dataReq, this.props);
    // if (responseData === false) {
    //     this._onNetworkError()
    // } else {
    //     if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //         let brandingHistoryListData = newPoModifyData(responseData.data)
    //         this.setState({
    //             brandingList: [...this.state.brandingList, ...brandingHistoryListData.newPoList],
    //             totalDataCount: brandingHistoryListData.totalCount
    //         })
    //     } else {
    //         Toaster.ShortCenterToaster(responseData.message)
    //     }
    // }
    // this.setState({
    //     pageLoader: false,
    //     listLoader: false,
    // })
  };

  _onShowHide = () => {
    this.setState({
      showHide: !this.state.showHide,
    });
  };

  onOpenModal = async () => {
    this.setState({
      tearmsConditionModal: !this.state.tearmsConditionModal,
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
        if (this.state.brandingList.length >= this.state.totalDataCount) {
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
      brandingList: [],
      refreshing: true,
      listLoader: true,
      pageLoader: true,
      // listDataLoader: true,
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
  renderContactList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{ flex: 1, marginHorizontal: "2%" }}>
          {this.dataList(item, key)}
        </View>
      </View>
    );
  };
  // for render data list
  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  // for design list data
  ListData = (item, key) => {
    // console.log("item >>>", item)
    return (
      <View style={styles.mainBox}>
        <TouchableOpacity
          style={styles.subBox}
          activeOpacity={0.8}
          onPress={() => this._onShowHide()}
        >
          <View style={styles.BoxMarginSec}>
            <View style={styles.violetSmallBox}>
              <Text style={styles.numberText}>01</Text>
            </View>
            <View style={styles.listItemSec}>
              <View style={styles.columnSec}>
                <Text style={styles.auctionText}>Auction Name</Text>
                <Text style={styles.auctionTypeText}>Auction Type</Text>
              </View>
              {this.state.showHide ? (
                <View style={styles.liveTimeSec}>
                  <View style={styles.liveGreenCircel}>
                    <View style={styles.deepGreenCircel} />
                  </View>
                  <View style={{ marginLeft: "10%" }}>
                    <View style={styles.violetLiveTextSec}>
                      <Text style={styles.textLive}>Live</Text>
                    </View>
                    <Text style={styles.timeGrayText}>
                      2:35 <Text style={styles.hrsText}>Hrs.</Text>
                    </Text>
                  </View>
                  <Image
                    source={ImageName.DROP_DOWN_UP_ARROW}
                    style={styles.violetDropDownLogo}
                  />
                </View>
              ) : (
                <View style={styles.liveTimeSec}>
                  <View style={{ marginLeft: "40%" }}>
                    <View style={styles.violetCircel}>
                      <Text style={styles.violetCircelNumberText}>36</Text>
                    </View>
                  </View>
                  <View style={styles.hrsTimeSec}>
                    <View style={styles.bigGreenCircel}>
                      <View style={styles.bigDeepgreenCircel} />
                    </View>
                    <View style={styles.hrsTimeTxtSec}>
                      <Text style={styles.timeGrayText}>2:35 </Text>
                      <Text style={styles.hrsText}>Hrs.</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {this.state.showHide ? (
          <View style={{ marginHorizontal: "3%" }}>
            <View style={{ marginTop: 10 }} />
            <Text style={styles.productText}>Product Name</Text>
            <Text style={styles.decovalText}>
              Decorval me decosturpen dermin, the complue so..
            </Text>
            <Text style={styles.deliveryLocationText}>Delivery Location</Text>
            <Text style={styles.valueText}>Kolkata</Text>
            <View style={styles.boxStyle} />
            <View style={styles.productItem}>
              <View style={styles.productFirstItem}>
                <Text style={styles.productUnitText}>Product Unit</Text>
                <Text style={styles.valueText}>10 KG/Packet</Text>
              </View>
              <View style={styles.productSecondItem}>
                <Text style={styles.productUnitText}>Quentity Required</Text>
                <Text style={styles.valueText}>400</Text>
              </View>
            </View>
            <View style={styles.productItem}>
              <View style={styles.productFirstItem}>
                <Text style={styles.productUnitText}>GST</Text>
                <Text style={styles.valueText}>18%</Text>
              </View>
              <View style={styles.productSecondItem}>
                <Text style={styles.productUnitText}>Auction Tik Size</Text>
                <Text style={styles.valueText}>10%</Text>
              </View>
            </View>
            <View style={styles.productItem}>
              <View style={styles.productFirstItem}>
                <Text style={styles.productUnitText}>Base Price</Text>
                <Text style={styles.valueText}>1,24,000</Text>
              </View>
              <View style={styles.productSecondItem}>
                <Text style={styles.productUnitText}>
                  Auction Delivery Date
                </Text>
                <Text style={styles.valueText}>22-12-2022</Text>
              </View>
            </View>
            <View style={styles.productItem}>
              <Text style={styles.readAllTxt}>
                Read all tearms & condition before perticipate in the auction
              </Text>
              <TouchableOpacity
                style={{ flex: 0.4, alignItems: "flex-end" }}
                onPress={() => this.onOpenModal()}
                activeOpacity={0.9}
              >
                <Text style={styles.detailTxt}>Detail</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.boxStyle} />
            <Text style={styles.putInformationText}>
              Put your bid Information
            </Text>

            <View style={styles.grayBox}>
              <View style={{ marginHorizontal: "5%" }}>
                <Text style={styles.priceText}> $ Price</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.grayBox}>
                <View style={{ marginHorizontal: "5%" }}>
                  <Text style={styles.priceText}> $ Price</Text>
                </View>
              </View>
              <View style={{ width: 5 }} />
              <View style={styles.grayBox}>
                <View style={{ marginHorizontal: "5%" }}>
                  <Text style={styles.priceText}> $ Fridge Cost</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.grayBox}>
                <View style={{ marginHorizontal: "5%" }}>
                  <Text style={styles.gstText}>CGST %</Text>
                </View>
              </View>
              <View style={{ width: 5 }} />
              <View style={styles.grayBox}>
                <View style={{ marginHorizontal: "5%" }}>
                  <Text style={styles.gstText}>SGST %</Text>
                </View>
              </View>
              <View style={{ width: 5 }} />
              <View style={styles.grayBox}>
                <View style={{ marginHorizontal: "5%" }}>
                  <Text style={styles.gstText}>IGST %</Text>
                </View>
              </View>
            </View>

            <View style={styles.subTotalSec}>
              <Text style={styles.subTotalText}>Sub Total</Text>
              <Text style={styles.ansValueText}> $ 000,0000,00</Text>
            </View>
            <View style={styles.txtBtnSec}>
              <BigTextButton
                height={50}
                borderRadius={15}
                backgroundColor={"#EBEBEB"}
                text={"Decline"}
                fontColor={"#2C3338"}
                // onPress={() => this._onLogin()}
              />
              <View style={{ width: 8 }} />
              <BigTextButton
                height={50}
                borderRadius={15}
                backgroundColor={"#7E47F3"}
                text={"Bid Now"}
                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                // onPress={() => this._onLogin()}
              />
            </View>
            <View style={{ marginBottom: 40 }} />
          </View>
        ) : null}
      </View>
    );
  };
  // for design modal section
  modalSection = () => {
    return (
      <>
        <Modal
          isVisible={this.state.tearmsConditionModal}
          onBackdropPress={() => this.onOpenModal()}
          onBackButtonPress={() => this.onOpenModal()}
          children={
            <View style={styles.modalview}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.boxSideSpace}>
                  <View style={styles.pinkSmallBox}>
                    <Image
                      source={ImageName.WHITE_ACTIVITY_LOGO}
                      style={styles.whiteActivityLogImg}
                    />
                  </View>
                  <Text style={styles.textActivityLog}>Tearms & Condition</Text>
                  <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => this.onOpenModal()}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={ImageName.AUCTION_CROSS_IMG}
                      style={styles.auctionCrossImg}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.underline} />
                <View style={styles.modalMarginSec}>
                  {this.state.tearmsConditionData.map((item, key) => (
                    <React.Fragment key={key}>
                      <View style={{ marginTop: 15 }}>
                        <Text style={styles.tearmsAndConditionText}>
                          {item.headerText}
                        </Text>
                        <Text style={styles.tearmsConditionValue}>
                          {item.subText}
                        </Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              </ScrollView>
              <View style={{ marginBottom: 40 }} />
            </View>
          }
        />
      </>
    );
  };

  listHeaderSection = () => {
    return <></>;
  };

  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header {...this.props} />
        <View style={styles.space}>
          {this.listHeaderSection()}
          {this.ListData()}
          {/* {this.state.pageLoader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View> :
                    <React.Fragment>
                        {this.state.brandingList.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.brandingList}
                                    renderItem={(item, key) => this.renderContactList(item, key)}
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
                                <View style={{ height: 300 }}></View>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <></>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                } */}
          {this.modalSection()}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveUpcomingOpenList);
