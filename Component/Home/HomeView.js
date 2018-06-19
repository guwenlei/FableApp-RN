import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import NaviBar from '../Common/NaviBar';
import HomeCell from './HomeCell';
import HomeDetail from './HomeDetail';

export default class Home extends Component{
    render(){
        return(
            <View style={styles.container}>
                <NaviBar
                    title='故事'
                />
                <ScrollView >
                    <HomeCell
                        iconName='jingdian'
                        title='经典故事'
                        onCallBack={(title) => this.pushDetail(title)}
                    />
                    <HomeCell
                        iconName='yisuo'
                        title='伊索寓言'
                        onCallBack={(title) => this.pushDetail(title)}
                    />
                    <HomeCell
                        iconName='gelin'
                        title='格林童话'
                        onCallBack={(title) => this.pushDetail(title)}
                    />
                    <HomeCell
                        iconName='antusheng'
                        title='安徒生童话'
                        onCallBack={(title) => this.pushDetail(title)}
                    />
                    <HomeCell
                        iconName='muou'
                        title='木偶奇遇记'
                        onCallBack={(title) => this.pushDetail(title)}
                    />
                </ScrollView>
            </View>
        );
    }
    pushDetail(title){

        this.props.navigator.push({
            component:HomeDetail,
            params:{title:title}
        });

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,206,1.0)',
    },
});