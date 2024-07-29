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
import MultipleSelectModalDropdown from '../multiple-select-modal-dropdown';

function MultipleDropdownInputBox({
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
    isBackdropPressRequired,
    isSearchable,
    selectSearchText,
    onChangeText
}) {

    const [modalVisible, setModalVisible] = useState(false);

    const inputBoxStyle = {
        height: height,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        elevation: 1,
        borderRadius: 10,
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


    if (selectedValue.length > 0) {
        headerText = "";
    }

    let findData = false;
    for (let i = 0; i < selectedValue.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (selectedValueType == "id") {
                if (data[j].id == selectedValue[i]) {
                    headerText += data[j].name;
                    if (i < selectedValue.length - 1) {
                        headerText += ", "
                    }
                    findData = true;
                    break;
                }
            } else if (selectedValueType == "name") {
                if (data[j].name == selectedValue[i]) {
                    headerText += data[j].name;
                    if (i < selectedValue.length - 1) {
                        headerText += ", "
                    }
                    findData = true;
                    break;
                }
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
            <MultipleSelectModalDropdown
                selectedValue={selectedValue}
                selectedValueType={selectedValueType}
                data={data}
                onPress={(...props) => onSelect(...props)}
                isVisible={modalVisible}
                isSearchable={isSearchable}
                selectSearchText={selectSearchText}
                onChangeText={(value) => onChangeText(value)}
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


MultipleDropdownInputBox.defaultProps = {
    height: 45,
    selectedText: "",
    selectedTextColor: "#0A0A0A",
    unSelectedTextColor: "#C0C0C0",
    selectedValue: [],
    selectedValueType: "id",
    data: [],
    upDownImages: [
        ImageName.GRAY_UP,
        ImageName.GRAY_DOWN
    ],
    upDownImgStyle: {},
    isDisabled: false,
    onSelect: () => { },
    headerText: "",
    borderRadius: 15,
    isBackButtonPressRequired: false,
    isBackdropPressRequired: false,
    isSearchable: false,
    selectSearchText: "",
    onChangeText: () => { }
};

MultipleDropdownInputBox.propTypes = {
    height: PropTypes.number,
    selectedText: PropTypes.string,
    selectedTextColor: PropTypes.string,
    unSelectedTextColor: PropTypes.string,
    selectedValue: PropTypes.array.isRequired,
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
    isSearchable: PropTypes.bool,
    selectSearchText: PropTypes.string,
    onChangeText: PropTypes.func
};


export default MultipleDropdownInputBox;