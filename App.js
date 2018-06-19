/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {
    Navigator
} from 'react-native-deprecated-custom-components';
export default class App extends Component{
  render() {
    return (
        <Navigator
            initialRoute={{ name: '', component: TabBar }}
            configureScene={({transiton:diraction}) => {
                if (diraction === 'bottom'){
                    return Navigator.SceneConfigs.FloatFromBottom
                }else {
                    return Navigator.SceneConfigs.PushFromRight
                }

            }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
            }}
        />
    );
  }
}
import Home from './Component/Home/HomeView';
import Collection from './Component/Collection/CollectionView';
import More from './Component/More/MoreView';
class TabBar extends Component{
    constructor(props){
        super(props);
        this.state=({
            selectedTab: '故事',
        })
    }
    renderTabBarItem(selectTab,icon,SelectIcon,Component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectTab}
                title={selectTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={{uri:icon}} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={{uri:SelectIcon}} />}
                onPress={() => this.setState({ selectedTab: selectTab })}
            >
                <Component navigator={this.props.navigator}/>
            </TabNavigator.Item>
        );
    }
  render(){
    return(
        <TabNavigator>
            {this.renderTabBarItem('故事','home','home_select',Home)}
            {this.renderTabBarItem('收藏','collec','collect_select',Collection)}
            {this.renderTabBarItem('更多','more','more_select',More)}
        </TabNavigator>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    tabText:{
        color:'#000000',
        fontSize:10
    },
    selectedTabText:{
        color:'rgba(234,167,55,1.0)'
    },
    icon:{
        width:24,
        height:24,
    },
});
