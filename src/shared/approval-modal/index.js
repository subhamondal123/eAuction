import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
// import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { Color, Dimension, FontFamily, ImageName } from '../../enums';
import Modal from '../modal';
import BigTextButton from '../big-text-button'
import styles from './style';

function ApprovalModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    onCancel,
    onAccept
}) {
    if (isHidden) return null;

    let bodyText = "";

    if (type == "acceptReq") {
        bodyText = "Do you want to accept the request ?";
    } else if (type == "declineReq") {
        bodyText = "Do you want to decline the request ?";
    }


    const onRequestCloseModal = () => {
        onCancel();
    }

    const onBackDropPressModal = () => {
        onCancel();
    }

    const onBackButtonPressModal = () => {
        onCancel();
    }

    const onCancelModal = () => {
        onCancel();
    }

    const onOk = () => {
        onAccept();
    }


    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20 }}>
                        <View style={{ height: 10 }} />
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: FontFamily.FONTS.INTER.BOLD,
                            fontSize: 16,
                            marginHorizontal: 10,
                            color: Color.COLOR.BLACK.BLACK_PEARL
                        }}>
                            {bodyText}
                        </Text>
                    </View>
                    {isLoading ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <ActivityIndicator
                                color={Color.COLOR.GRAY.GRAY_COLOR}
                                size={'large'}
                            />
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                            <BigTextButton
                                borderRadius={30}
                                height={40}
                                backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                text={"Ok"}
                                onPress={() => onOk()}
                            />
                            <View style={{ width: "5%" }} />
                            <BigTextButton
                                borderRadius={30}
                                height={40}
                                backgroundColor={Color.COLOR.RED.RED_ORANGE}
                                text={"Cancel"}
                                onPress={() => onCancelModal()}
                            />
                        </View>
                    }
                </View>
            }

        />
    )
}

ApprovalModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    onCancel: () => { },
    onAccept: () => { },
}

ApprovalModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    onCancel: PropTypes.func,
    onAccept: PropTypes.func
}

export default ApprovalModal;