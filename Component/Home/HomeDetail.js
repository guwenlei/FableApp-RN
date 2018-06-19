import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import NaviBar from '../Common/NaviBar';
import VideoPlay from './VideoPlay';
import {Navigator} from "react-native-deprecated-custom-components";
const REQUEST_URL = 'http://osaeb6trv.bkt.clouddn.com/StoryVoiceFild.json';
export default class HomeDetail extends Component{
    constructor(props){
        super(props);
        this.state=({
            dataArray:[],
            baseURL:''
        })
    }
    componentDidMount() {
        var title =this.props.title;
        //网络加载数据
        fetch(REQUEST_URL)
            .then((reponse) => reponse.json())
            .then((responseData) => {
                this.setState({
                    baseURL:responseData.baseurl,
                })
                if (title==='经典故事'){
                    this.setState({dataArray:responseData.firstFild})
                }else if (title==='伊索寓言'){
                    this.setState({dataArray:responseData.secondFild})
                }else if (title==='格林童话'){
                    this.setState({dataArray:responseData.thirdFild})
                }else if (title==='安徒生童话'){
                    this.setState({dataArray:responseData.antusheng})
                }else if (title==='木偶奇遇记'){
                    this.setState({dataArray:responseData.muouqiyuji})
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    render(){
        return(
            <View style={styles.container}>
                <NaviBar
                    title={this.props.title}
                    leftIconName='left_arrow_white'
                    leftOnPress={() =>{
                        this.props.navigator.pop()
                    }}
                />
                <FlatList
                    data={this.state.dataArray}
                    renderItem={({item,index}) =>this.renderCell(item,index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
    renderCell(item,index){
        return(
            <TouchableOpacity onPress={()=>{this.clickCell(index)}}>
                <View style={styles.cellStyle}>
                    <Text>{item}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    clickCell(index){
        this.props.navigator.push({
            component:VideoPlay,
            params:{index:index,
                dataArray:this.state.dataArray,
                baseURL:this.state.baseURL},
            transiton:'bottom',
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,206,1.0)',
    },
    cellStyle:{
        height:50,
        borderBottomWidth:0.5,
        borderColor:'rgba(220,220,220,1.0)',
        justifyContent:'center',
        paddingLeft:10,
    },
});