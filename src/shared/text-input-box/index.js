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
import Clipboard from '@react-native-community/clipboard';

function TextInputBox({
    placeholder,
    placeholderTextColor,
    value,
    keyboardType,
    editable,
    borderColor,
    borderWidth,
    backgroundColor,
    borderRadius,
    secureTextEntry,
    onChangeText,
    refName,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,
    maxLength,
    multiline,
    onFocus,
    onBlur,
    isActive,
    inactiveBGColor,
    activeBGColor,
    activeBorderColor,
    inactiveTextColor,
    activeTextColor,
    isLeftIcon,
    leftIcon,
    leftIconStyle,
    onPressLeftIcon,
    isRightIcon,
    rightIcon,
    rightIconStyle,
    onPressRightIcon,
    height,
    fontSize,
    fontFamily,
    additionalTextInput,
    alignItems
}) {

    // const inputRef = useRef(null);

    const boxStyle = {
        height: height,
        backgroundColor: inactiveBGColor,
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: alignItems
    }

    const activeBoxStyle = {
        height: height,
        backgroundColor: activeBGColor,
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: alignItems,
        borderColor: activeBorderColor,
        borderWidth: 1
    }

    const textInput = {
        height: alignItems == 'flex-start' ? height : undefined,
        fontSize: fontSize,
        color: inactiveTextColor,
        fontFamily: fontFamily,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1
    }

    const activeTextInput = {
        fontSize: fontSize,
        color: activeTextColor,
        fontFamily: fontFamily,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1
    }

    const focusedInput = () => {
        // Clipboard.setString('');
        onFocus();
    }

    const blurredInput = () => {
        onBlur();
    }

    const changeText = (value) => {
        onChangeText(value);
    }

    const onSubmit = () => {
        onSubmitEditing();
    }

    const onLeftIconPress = () => {
        onPressLeftIcon();
    }

    const onRightIconPress = () => {
        onPressRightIcon();
    }

    // const onRef = (input) => {
    //     ref(input);
    // }


    return (
        <View style={isActive ? activeBoxStyle : boxStyle}>
            {isLeftIcon ?
                <TouchableOpacity
                    onPress={() => onLeftIconPress()}
                    style={{ marginLeft: 21, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}>
                    <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, leftIconStyle]} source={leftIcon} />
                </TouchableOpacity>
                :
                null
            }

            <TextInput
                style={[isActive ? activeTextInput : textInput, additionalTextInput]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                multiline={multiline}
                // autoComplete={"email"}
                editable={editable}
                onChangeText={(value) => changeText(value)}
                ref={refName}
                onSubmitEditing={() => onSubmit()}
                returnKeyType={returnKeyType}
                blurOnSubmit={blurOnSubmit}
                onFocus={() => focusedInput()}
                onBlur={() => blurredInput()}
                contextMenuHidden={true}
                selectTextOnFocus={false}
                // onSelectionChange={() => Clipboard.setString('')}
                // borderColor={borderColor}
                // borderWidth={borderWidth}
                // backgroundColor={backgroundColor}
            />

            {isRightIcon ?
                <TouchableOpacity
                    onPress={() => onRightIconPress()}
                    style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}>
                    <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, rightIconStyle]} source={rightIcon} />
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
}

TextInputBox.defaultProps = {
    placeholder: "Please Enter ...",
    placeholderTextColor: Color.COLOR.GRAY.SILVER,
    value: "",
    keyboardType: "default",
    borderRadius: 10,
    editable: true,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    secureTextEntry: false,
    onChangeText: () => { },
    refName: () => { },
    onSubmitEditing: () => { },
    returnKeyType: "default",
    blurOnSubmit: true,
    maxLength: 250,
    multiline: false,
    onFocus: () => { },
    onBlur: () => { },
    isActive: false,
    inactiveBGColor: Color.COLOR.WHITE.WHITE_SMOKE,
    activeBGColor: Color.COLOR.WHITE.PURE_WHITE,
    activeBorderColor: Color.COLOR.BLACK.PURE_BLACK,
    inactiveTextColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    activeTextColor: "#0A0A0A",
    isLeftIcon: false,
    leftIcon: ImageName.SEARCH_ICON,
    leftIconStyle: {
        height: 20,
        width: 20
    },
    onPressLeftIcon: () => { },
    isRightIcon: false,
    rightIcon: ImageName.SEARCH_ICON,
    rightIconStyle: {
        height: 20,
        width: 20
    },
    onPressRightIcon: () => { },
    height: 55,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    additionalTextInput: {},
    alignItems: 'center'
};

TextInputBox.propTypes = {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    borderRadius: PropTypes.number,
    editable: PropTypes.bool,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    backgroundColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func,
    refName: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    returnKeyType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isActive: PropTypes.bool,
    inactiveBGColor: PropTypes.string,
    activeBGColor: PropTypes.string,
    activeBorderColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    isLeftIcon: PropTypes.bool,
    leftIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    leftIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    onPressLeftIcon: PropTypes.func,
    isRightIcon: PropTypes.bool,
    rightIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    rightIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    onPressRightIcon: PropTypes.func,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    additionalTextInput: PropTypes.instanceOf(Object),
    alignItems: PropTypes.string
};


export default TextInputBox;