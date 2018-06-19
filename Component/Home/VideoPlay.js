import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Slider,
} from 'react-native';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
export default class VideoPlay extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataSource: [],
            index: 0,
            fileURL: '',
            currentPlay: '',
            currentTime: '00:00',
            totalTime: '',
            maxValue: 0,
            currentValue: 0,
            isStop: false,
            isLike:false,
        })
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.dataArray,
            index: this.props.index,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={{uri: 'backimage'}} style={{width: width, height: height}}>
                    {/*导航栏*/}
                    {this.renderNavi()}
                    {/*故事列表*/}
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({item, index}) => this.renderCell(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        // scrollToIndex={inde=10}
                        // getItemLayout={(data, index) => ( {length: 50, offset: 50 * index, index} )}
                    />
                    {/*加载音频*/}

                    <Video
                        source={{uri: encodeURI(this.props.baseURL + this.state.dataSource[this.state.index])}}
                        ref='player'
                        rate={1}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                        volume={1.0}
                        // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
                        muted={false}                  // true代表静音，默认为false.
                        paused={this.state.isStop}                 // true代表暂停，默认为false
                        //resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                        repeat={false}                 // 是否重复播放
                        playInBackground={false}       // 当app转到后台运行的时候，播放是否暂停
                        playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                        //onLoadStart={()=>{}}   // 当视频开始加载时的回调函数
                        onLoad={(data) => {
                            this.setState({
                                // 总时长
                                totalTime: this.formatTime(data.duration),
                                maxValue: Math.round(data.duration)
                            })
                        }}      // 当视频加载完毕时的回调函数
                        onProgress={(data) => {
                            this.setState({
                                currentTime: this.formatTime(data.currentTime),
                                currentValue: Math.round(data.currentTime)
                            })
                        }}      //  进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={() => {
                            if (this.state.dataSource.length > this.state.index) {
                                this.setState({index: this.state.index + 1})
                            } else {
                                this.setState({index: 0})
                            }
                        }}             // 当视频播放完毕后的回调函数
                        onError={() => {

                        }}      // 当视频不能加载，或出错后的回调函数
                        onBuffer={() => {

                        }}
                        // style={styles.backgroundVideo}
                    />
                    {/*底部工具栏*/}
                    {this.renderTool()}
                </ImageBackground>
            </View>
        );
    }

    //把秒数转换为时间类型
    formatTime(time) {
        time = Math.round(time)
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    renderCell(item, index) {
        let style = this.state.index === index ? styles.selectCellStyle : styles.cellTitleStyle;
        return (
            <TouchableOpacity onPress={() => this.clickCell(index)}>
                <View style={styles.cellStyle}>
                    <Text style={style}>{item}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 点击cell
    clickCell(index) {
        this.setState({
            index: index,
            isStop: false,
        })
    }


    renderTool() {
        return (
            <View style={styles.toolStyle}>
                <View style={styles.sliderViewStyle}>
                    <Text style={styles.minValueStyle}>{this.state.currentTime}</Text>
                    <Slider style={styles.sliderStyle}
                            maximumTrackTintColor='red'
                            minimumTrackTintColor='orange'
                            minimumValue={0}
                            maximumValue={this.state.maxValue}
                            value={this.state.currentValue}
                            onValueChange={(value) => {
                                // 滑动slider
                                this.setState({
                                    currentValue: value
                                })
                            }}
                    />
                    <Text style={styles.maxValueStyle}>{this.state.totalTime}</Text>
                </View>
                <View style={styles.toolBottonViewStyle}>
                    <TouchableOpacity onPress={() => {
                        //上一个
                        if (this.state.index > 0) {
                            this.setState({index: this.state.index - 1})
                        }
                    }}>
                        <Image source={{uri: 'up_play'}} style={styles.upIconStyle}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        // 暂停或播放
                        this.setState({
                            isStop: !this.state.isStop
                        })
                    }}>
                        <Image source={{uri: this.state.isStop === true ? 'stop' : 'play'}}
                               style={styles.playIconStyle}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        //下一个
                        if (this.state.dataSource.length > this.state.index) {
                            this.setState({index: this.state.index + 1})
                        } else {
                            this.setState({index: 0})
                        }
                    }}>
                        <Image source={{uri: 'next'}} style={styles.nextIconStyle}/>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    renderNavi() {
        return (
            <View style={styles.naviStyle}>
                <TouchableOpacity style={{left: 10, position: 'absolute'}} onPress={() => this.clickClose()}>
                    <Image source={{uri: 'icon_close'}} style={styles.leftIconStyle}/>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>{this.state.dataSource[this.state.index]}</Text>
                <TouchableOpacity
                    style={{position: 'absolute',right: 10}}
                    onPress={() => {
                    // 添加/移除喜欢
                        {this.collectAction()}
                }}>
                    <Image source={{uri:this.state.isLike===false?'icon_hom_praise':'icon_hom_praise_highlight'}} style={styles.rightIconStyle}/>
                </TouchableOpacity>
            </View>
        );
    }
    collectAction(){
        this.setState({isLike:!this.state.isLike});
    }

    clickClose() {
        this.props.navigator.pop()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,206,1.0)',
    },
    naviStyle: {
        height: Platform.OS === 'ios' ? 64 : 44,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    leftIconStyle: {
        height: 20,
        width: 20,
    },
    rightIconStyle: {
        height: 20,
        width: 20,
    },
    titleStyle: {
        fontSize: 16,
        color: 'white',
    },
    cellStyle: {
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: 'white',
        justifyContent: 'center',
        marginRight: 60,
    },
    selectCellStyle: {
        fontSize: 20,
        color: 'rgba(234,167,55,1.0)',
        textAlign: 'center'
    },
    cellTitleStyle: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    toolStyle: {
        height: 100,
        marginTop: 10,
    },
    sliderViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    sliderStyle: {
        height: 10,
        width: width - 100,
    },
    maxValueStyle: {
        color: 'rgba(234,167,55,1.0)',
        position: 'absolute',
        right: 10,
    },
    minValueStyle: {
        color: 'rgba(234,167,55,1.0)',
        position: 'absolute',
        left: 10,
    },
    toolBottonViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    upIconStyle: {
        height: 40,
        width: 40,
        marginLeft: 50,
    },
    playIconStyle: {
        height: 70,
        width: 70,
    },
    nextIconStyle: {
        height: 40,
        width: 40,
        marginRight: 50,
    },

});