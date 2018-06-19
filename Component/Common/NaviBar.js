import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');
export default class NaviBar extends Component{
    render(){
        return(
            <View style={styles.container}>
                    {this.renderLeftIcon()}
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                    {/*{this.renderRightIcon()}*/}
            </View>
        );
    }

    renderLeftIcon(){
        var leftIconName = this.props.leftIconName;
        if (leftIconName) {
            return(
                <TouchableOpacity
                    style={styles.leftViewStyle}
                    onPress={() =>this.props.leftOnPress()}>
                    <Image source={{uri:leftIconName}} style={styles.leftIconStyle}/>
                </TouchableOpacity>
            );
        }

    }

    renderRightIcon(){
        var rightIconName = this.props.rightIconName;
        if (rightIconName){
            return(
                <Image source={{uri:rightIconName}} style={styles.rightIconStyle}/>
            );
        }
    }

}
const styles = StyleSheet.create({
    container: {
        height:Platform.OS==='ios'?64:44,
        backgroundColor: 'rgba(234,167,55,1.0)',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    titleStyle:{
        fontSize:18,
        color:'white',
        marginTop:Platform.OS==='ios'?15:0,
    },
    leftViewStyle:{
        position:'absolute',
        left:15,
         top:Platform.OS==='ios'?26:0
    },
    leftIconStyle:{
        height:24,
        width:12,

    },
    rightIconStyle:{
        height:24,
        width:24,
    }
});