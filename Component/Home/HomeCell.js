import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
export default class HomeCell extends Component{
    componentDidMount() {
        console.log(this.props.iconName);
        console.log(this.props.title);
    }
    render(){
        return(
            <TouchableOpacity onPress={() =>this.clickCell(this.props.title)}>
                <View style={styles.container}>
                    <View style={styles.leftViewStyle}>
                        <Image source={{uri:this.props.iconName}} style={styles.iconStyle}/>
                        <Text style={styles.titleStyle}>{this.props.title}</Text>
                    </View>
                    <Image source={{uri:"icon_right_arrow"}} style={{height:12,width:8}}/>
                </View>
            </TouchableOpacity>
        );
    }
    clickCell(title){
        this.props.onCallBack(title);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        height:80,
        justifyContent:'space-between',
        borderBottomWidth:0.5,
        borderColor:'rgba(220,220,220,1.0)',
    },
    leftViewStyle:{
      flexDirection:'row',
        alignItems:'center',
    },
    iconStyle:{
        height:60,
        width:60,
        borderRadius:5,
    },
    titleStyle:{
        fontSize:16,
        marginLeft:10,
    },
});