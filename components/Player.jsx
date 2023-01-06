import {
    View, Text, StyleSheet, PermissionsAndroid, Alert, TouchableOpacity, Animated, Easing,
} from 'react-native'
import React, { useEffect, useState, } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { SetupService } from '../setupPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
const Player = ({ LibrarySong, navigation }) => {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { position, duration } = useProgress()
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [repeat, setRepeat] = useState(false)
    const [random, setRandom] = useState(false)
    const [like, setLike] = useState(false)
    const [song, setSong] = useState({});
    const [arr, setarr] = useState([])
    let rotateValueHolder = new Animated.Value(0);
    let user = auth().currentUser;
    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };
    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        if (LibrarySong) {
            TrackPlayer.reset()
            const trackLib = {
                id: `Song${LibrarySong.title}`,
                url: `${LibrarySong.url}`,
                title: `${LibrarySong.title}`
            }
            TrackPlayer.add([trackLib])
            setIsPlaying(true)
            startImageRotateFunction()
            TrackPlayer.play()
            const getName = async () => {
                var title = await TrackPlayer.getCurrentTrack()
                var pos = await TrackPlayer.getTrack(title)
                setTrack(pos.title)
            }
            getName()

        }

    }, [LibrarySong])
    useEffect(() => {
        async function run() {
            const isSetup = await SetupService();
            if (!isSetup)
                setIsPlayerReady(isSetup);
            setTrack(pos.title)
            if (Platform.OS === 'android') {
                isReadGranted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                );
            }
            if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
                //TODO
                // console.log("Permission Granted")
            }
            else {
                Alert.alert("Storage Read Permission Required")
            }
        }
        run();
        TrackPlayer.reset()
    }, []);
    const forward = async () => {
        var title = await TrackPlayer.getCurrentTrack()
        var pos = await TrackPlayer.getTrack(title)
        setTrack(pos.title)
        TrackPlayer.skipToNext()
    }
    const backward = async () => {
        var title = await TrackPlayer.getCurrentTrack()
        var pos = await TrackPlayer.getTrack(title)
        setTrack(pos.title)
        TrackPlayer.skipToPrevious()
    }
    const repeatMode = async () => {
        if (repeat == true || repeat == false) {
            if (repeat) {
                TrackPlayer.setRepeatMode(RepeatMode.Off)
                //  console.log(await TrackPlayer.getRepeatMode())
            }

            else {
                TrackPlayer.setRepeatMode(RepeatMode.Track)
                //  console.log("Repeat On", await TrackPlayer.getRepeatMode())
            }
            setRepeat(!repeat)
        }
    }
    const shuffleMode = async () => {
        setRandom(!random)
        var currentQueue = await TrackPlayer.getQueue();
        TrackPlayer.reset()
        // console.log(currentQueue)
        var currentQueue = currentQueue.sort(() => 0.5 - Math.random())
        // console.log(currentQueue)
        TrackPlayer.add(currentQueue)
        var title = await TrackPlayer.getCurrentTrack()
        var pos = await TrackPlayer.getTrack(title)
        setTrack(pos.title)
        await TrackPlayer.play()
    }
    const liked = async () => {
        setLike(!like);
        setarr([...arr, song]);
        try {
            await AsyncStorage.setItem(user.email, JSON.stringify(arr));
            console.log('songs added');
        } catch (error) {
            console.log(error);
        }
    };
    const unlike = async () => {
        setLike(like);
        let id = song.id
        const updatedItems = arr.filter((item) => item.id !== id);
        // Use the setItems function to update the state with the new array of items
        setarr(updatedItems);
        try {
            await AsyncStorage.setItem(user.email, JSON.stringify(arr));
            console.log('song list updated');
        } catch (error) {
            console.log(error);
        }
    };
    const likedSongs = () => {
        Navigation.navigate('LikedSongs')
    }
    const secondsToTime = (time) => {
        m = Math.floor(time % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(time % 60).toString().padStart(2, '0');

        return m + ':' + s;
    }
    return (
        <View>
            <View style={styles.musicBackground}>
                <Animated.Image style={{ height: 300, width: 300, borderRadius: 300 / 2, borderColor: "white", borderWidth: 1, transform: [{ rotate: RotateData }], }}
                    source={require('../assets/images/musicBackground.jpg')} />
            </View>
            <View style={styles.TrackLikeContainer}>
                <Text style={styles.trackName}>{track}</Text>
                <Text> {like ?
                    <Icon name="heart" color="#1DB954" size={30} onPress={liked} onLongPress={likedSongs} />
                    :
                    <Icon name="heart" color="white" size={30} onPress={unlike} />
                }</Text>
            </View>
            <View>
                <Slider
                    style={{ height: 40, backgroundColor: "#191414" }}
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="white"
                    thumbTintColor="white"
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={value => {
                        TrackPlayer.pause();
                        TrackPlayer.seekTo(value)
                        TrackPlayer.play();
                    }}
                />
                <View style={styles.time}>
                    <Text style={styles.timeFont}> {secondsToTime(position)}</Text>
                    <Text style={styles.timeFont}>{secondsToTime(duration)}</Text>
                </View>
            </View>
            <View style={styles.controls}>
                <View>{
                    random ? <Icon name='random' size={25} color="white" onPress={shuffleMode} /> : <Icon name='random' size={25} color="grey" onPress={shuffleMode} />
                }
                </View>
                <Icon name='step-backward' size={25} color="white" onPress={backward} />
                <View style={styles.circle}>
                    {
                        isPlaying ? <Icon name='pause' size={25} color="black" onPress={() => {

                            TrackPlayer.pause()
                            setIsPlaying(false)

                        }} /> : <Icon name='play' size={25} color="black" onPress={() => {

                            TrackPlayer.play()
                            setIsPlaying(true)
                        }} />
                    }
                </View>
                <Icon name='step-forward' size={25} color="white" onPress={forward} />
                <View>{
                    repeat ? <Icon name='retweet' size={25} color="white" onPress={repeatMode} /> : <Icon name='retweet' size={25} color="grey" onPress={repeatMode} />
                }
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#191414",
        alignItems: "center",
    },
    time: {
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#191414"
    },
    timeFont: {
        marginHorizontal: 15,
        color: "white",
    },
    trackName: {
        fontWeight: "900",
        fontSize: 20,
        color: "white",
        backgroundColor: "#191414",

    },
    musicBackground: {
        height: '60%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191414",

    },
    TrackLikeContainer: {
        flexDirection: "row",
        backgroundColor: "#191414",
        justifyContent: "space-around",

    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
})
export default Player