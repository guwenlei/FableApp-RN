import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import NaviBar from '../Common/NaviBar';
export default class More extends Component{
    render(){
        return(
            <View style={styles.container}>
                <NaviBar
                    title='更多'
                />
                <ScrollView>
                    {this.renderItem1('联系我们')}
                    {this.renderItem1('评价')}
                    {this.renderItem2('当前版本','1.0')}
                </ScrollView>
            </View>
        );
    }
    renderItem1(title){
        return(
            <View style={styles.cellStyle}>
                <Text>{title}</Text>
                <Image source={{uri:"icon_right_arrow"}} style={{height:12,width:8}}/>
            </View>
        );
    }
    renderItem2(title,bid){
        return(
            <View style={styles.cellStyle}>
                <Text>{title}</Text>
                <Text style={{marginRight:10}}>{bid}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,206,1.0)',
    },
    cellStyle:{
        flexDirection:'row',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderColor:'rgba(220,220,220,1.0)',
        paddingLeft:10,
        paddingRight:10,
    },
});