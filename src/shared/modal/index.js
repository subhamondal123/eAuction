import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import Modal from "react-native-modal";

function CommonModal({
    children,
    isHidden,
    isVisible,
    additionalStyles,
    padding,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onClose
}) {

    if (isHidden) return null;

    // const [visible, setVisible] = useState(isVisible);

    const containerStyle = {
        padding: padding,
        ...additionalStyles
    };

    const onRequestCloseModal = () => {
        // onRequestClose();
        onClose();
    }

    const onBackDropPressModal = () => {
        // console.log("backdrop");
        onBackdropPress();
        // onClose();
    }

    const onBackButtonPressModal = (val) => {
        // onBackButtonPress();
        onClose();
    }

    return (
        <Modal
            isVisible={isVisible}
            style={containerStyle}
            animationType="fade"
            transparent={true}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}>
            
            {children}
        </Modal>
    );
}

CommonModal.defaultProps = {
    children: null,
    isHidden: false,
    isVisible: false,
    additionalStyles: {},
    padding: 20,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onClose: () => { },
};

CommonModal.propTypes = {
    children: PropTypes.node,
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool.isRequired,
    additionalStyles: PropTypes.instanceOf(Object),
    padding: PropTypes.number,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onClose: PropTypes.func,
};


export default CommonModal;