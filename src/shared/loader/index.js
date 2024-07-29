import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import LottieViewLoad from '../lottieViewLoad';

function Loader({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width,
    backgroundColor
}) {
    if (isHidden) return null;

    const container = { justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor , zIndex: 1 };

    return (
        <View style={[StyleSheet.absoluteFillObject, container]}>
            <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} height={height} width={width}/>
        </View>
    )
}


Loader.defaultProps = {
    type: "liquidDotLoader",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height:120,
    width:120,
    backgroundColor: "#fff"
};

Loader.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height:PropTypes.number,
    width:PropTypes.number,
    backgroundColor: PropTypes.string
};


export default Loader;