import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import styles from './style';
import LottieViewLoad from '../lottieViewLoad';

function NoDataFound({
    isHidden,
    type,
    autoPlay,
    loop,
    height,
    width
}) {
    if (isHidden) return null;

    return (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
            <LottieViewLoad type={type} autoPlay={autoPlay} loop={loop} hight={height} width={width} />
        </View>
    )
}

NoDataFound.defaultProps = {
    type: "eAuctionNoData",
    isHidden: false,
    autoPlay: true,
    loop: true,
    height: 55,
    width: 30
};

NoDataFound.propTypes = {
    type: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
};


export default NoDataFound;