import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import NaviBar from '../Common/NaviBar';
export default class Collection extends Component{
    render(){
        return(
            <View style={styles.container}>
                <NaviBar
                    title='收藏'
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});