import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';
import SingleSelectModalDropdown from '../single-select-modal-dropdown';

function DropdownInputBox({
    height,
    selectedText,
    selectedTextColor,
    unSelectedTextColor,
    selectedValue,
    selectedValueType,
    data,
    upDownImages,
    upDownImgStyle,
    isDisabled,
    onSelect,
    headerText,
    borderRadius,
    isBackButtonPressRequired,
    isBackdropPressRequired
}) {

    const [modalVisible, setModalVisible] = useState(false);

    const inputBoxStyle = {
        height: height,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: 'center'
    }

    const inputBoxText = {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: 21,
        marginRight: 10,
        flex: 1,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR
    }


    const onOpenAndCloseModal = () => {
        if (isDisabled == false) {
            setModalVisible(!modalVisible);
        }
    }

    const onSelectData = async (value) => {
        await onSelect(value);

        onOpenAndCloseModal();
    }

    const onBackButtonPress = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onRequestClose = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }


    const onBackdropPress = () => {
        if (isBackdropPressRequired) {
            onOpenAndCloseModal();
        }
    }

    let findData = false;
    for (let i = 0; i < data.length; i++) {
        if (selectedValueType == "id") {
            if (data[i].id == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        } else if (selectedValueType == "name") {
            if (data[i].name == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        }
    }



    return (
        <>
            <TouchableOpacity style={inputBoxStyle} onPress={() => onOpenAndCloseModal()} activeOpacity={0.9}>
                <Text style={[inputBoxText, { color: findData == true ? selectedTextColor : unSelectedTextColor }]} numberOfLines={1}>{headerText}</Text>
                <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={[{ height: 15, width: 15, resizeMode: 'contain' }, upDownImgStyle]} source={modalVisible ? upDownImages[0] : upDownImages[1]} />
                </View>
            </TouchableOpacity>
            <SingleSelectModalDropdown
                selectedValue={selectedValue}
                selectedValueType={selectedValueType}
                data={data}
                onPress={(value) => onSelectData(value)}
                isVisible={modalVisible}
                headerText={headerText}
                borderRadius={borderRadius}
                onClose={() => onOpenAndCloseModal()}
                onBackButtonPress={() => onBackButtonPress()}
                onBackdropPress={() => onBackdropPress()}
                onRequestClose={() => onRequestClose()}
            />
        </>
    )
}


DropdownInputBox.defaultProps = {
    height: 45,
    selectedText: "",
    selectedTextColor: "#0A0A0A",
    unSelectedTextColor: "#C0C0C0",
    selectedValue: "",
    selectedValueType: "id",
    data: [],
    upDownImages: [
        ImageName.DROP_DOWN_UP_ARROW,
        ImageName.VIOLET_DOWN_LOGO
    ],
    upDownImgStyle: {},
    isDisabled: false,
    onSelect: () => { },
    headerText: "",
    borderRadius: 15,
    isBackButtonPressRequired: false,
    isBackdropPressRequired: false
};

DropdownInputBox.propTypes = {
    height: PropTypes.number,
    selectedText: PropTypes.string,
    selectedTextColor: PropTypes.string,
    unSelectedTextColor: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValueType: PropTypes.string,
    data: PropTypes.array.isRequired,
    upDownImages: PropTypes.array.isRequired,
    upDownImgStyle: PropTypes.instanceOf(Object),
    isDisabled: PropTypes.bool,
    onSelect: PropTypes.func,
    headerText: PropTypes.string,
    borderRadius: PropTypes.number,
    isBackButtonPressRequired: PropTypes.bool,
    isBackdropPressRequired: PropTypes.bool,
};


export default DropdownInputBox;