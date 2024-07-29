import React from "react";
import styles from "./style";
import { DeviceInfo } from "../../services/config";
import { Toaster } from "../../services/common-view-function";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  AlertMessage,
  Color,
  FontFamily,
  ImageName,
  Padding,
} from "../../enums";
import { TextButton } from "../../shared";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateCheckForNetwork } from "../../redux/SRMBAuctionAction";
import LottieViewLoad from "../../shared/lottieViewLoad";
// this is network error page
class NetworkError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this is initial function which is call first
  componentDidMount() {}

  onTryAgain = async () => {
    if (await DeviceInfo.CheckConnection()) {
      // this.props.route.params.reload();
      this.props.navigation.goBack();
    } else {
      Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NETWORK.ERROR);
    }
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={ImageName.BACKGROUND_IMAGE}
          style={styles.bgimage}
        >
          <View style={styles.logoSec}>
            <LottieViewLoad
              height={150}
              type={"networkError"}
              autoPlay={true}
              loop={true}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.errorText}>{`OOPS! \n NO INTERNET`}</Text>
            <Text style={styles.errorTextMsg}>
              Please check your network connection
            </Text>
            <View
              style={{
                marginTop: Padding.PADDING.NORMAL_PADDING.NORMAL_PADDING_20X,
              }}
            />
            <TextButton
              backgroundColor={Color.COLOR.BLUE.CAPRI}
              color={Color.COLOR.WHITE.PURE_WHITE}
              fontFamily={FontFamily.FONTS.INTER.BOLD}
              text={"TRY AGAIN"}
              onClickValue={(value) => this.onTryAgain(value)}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

// export default NetworkError;
const mapStateToProps = (state) => {
  const { SRMBAuctionRedux } = state;
  return { SRMBAuctionRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NetworkError);
