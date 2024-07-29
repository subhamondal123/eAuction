import React from "react";
import styles from "./Style";
import { DeviceInfo } from "../../services/config";
import { Toaster } from "../../services/common-view-function";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  AlertMessage,
  Color,
  FontFamily,
  ImageName,
  Padding,
} from "../../enums";
import { BigTextButton, TextButton } from "../../shared";
import LottieViewLoad from "../../shared/lottieViewLoad";
import { PLAYSTORE_URL } from "../../../globalConstant";
// this is new version available page
class NewVersionAvailable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this is initial function which is call first
  componentDidMount() {}

  onUpdate = async () => {
    Linking.openURL(PLAYSTORE_URL);
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={ImageName.WHITE_ACTIVITY_LOGO}
          style={styles.bgimage}
        >
          <View style={styles.logoSec}>
            <LottieViewLoad
              height={150}
              type={"updateAvailable"}
              autoPlay={true}
              loop={true}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.errorText}>{`NEW VERSION AVAILABLE`}</Text>
            <Text style={styles.errorTextMsg}>Please Update</Text>
            <View
              style={{
                marginTop: Padding.PADDING.NORMAL_PADDING.NORMAL_PADDING_20X,
              }}
            />
            <View style={{ marginHorizontal: "15%" }}>
              <BigTextButton
                text={"Update"}
                onPress={(value) => this.onUpdate(value)}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default NewVersionAvailable;
