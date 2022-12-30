import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
import { SetupService } from '../setupPlayer';
import getSongs from '../getTracks'


const track3 = {
    id: 'track3',
    url:'file:///storage/emulated/0/Music/file_example_MP3_1MG.mp3',
    title: 'Track 1',
    artist: 'Artist 1',
};
const track2 = {
    id: 'track2',
    url: 'file:///storage/emulated/0/Music/file_example_MP3_1MG.mp3',
    title: 'Track 1',
    artist: 'Artist 1',
};

const track1 = {
    id: 'StorageSong',
    url: 'file:///storage/emulated/0/Music/file_example_MP3_1MG.mp3',
    title: 'AA Jaana',
    artist: 'Artist 1',
};


const Player = ({ route }) => {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { position, duration } = useProgress()
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [repeat, setRepeat] = useState(false)
    const [random, setRandom] = useState(false)
    const [songsList, setSongsList] = useState(null)

    useEffect(() => {
        async function run() {
            const isSetup = await SetupService();
            setIsPlayerReady(isSetup);
      
           TrackPlayer.add([track2, track3, track1])
        }
        run();
    }, []);

    const showMusicList = async() => {
    //     var songs = await getSongs()
    //     // console.log(songs)
    //     const track1 = {
    //         id: 'StorageSong',
    //         url: 'file:///storage/emulated/0/Music/file_example_MP3_1MG.mp3',
    //         title: 'AA Jaana',
    //         artist: 'Artist 1',     
    //     };
    //    TrackPlayer.add([track1])
    //    //await TrackPlayer.getTrack()
    //    console.log( await TrackPlayer.getTrack() )
 
    //     console.log("Queue",await TrackPlayer.getQueue())
    console.log("HEHE")
  
      
    }



    return (
        <View>
            <Button title='Show List' onPress={showMusicList} />
            <View>

                <Slider
                    style={{ height: 40, backgroundColor: "black" }}
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
                    <Text style={styles.timeFont}> {position.toFixed(0)}{"s"}</Text>
                    <Text style={styles.timeFont}>{duration.toFixed(0)}{"s"}</Text>
                </View>
            </View>
            <View style={styles.controls}>
                <View>{
                    random ? <Icon name='random' size={30} color="white" onPress={() => setRandom(!random)} /> : <Icon name='random' size={30} color="grey" onPress={() => setRandom(!random)} />
                }
                </View>

                <Icon name='step-backward' size={30} color="white" onPress={() => TrackPlayer.skipToPrevious()} />
                <View>
                    {
                        isPlaying ? <Icon name='pause' size={60} color="white" onPress={() => {
                            TrackPlayer.pause()
                            setIsPlaying(false)

                        }} /> : <Icon name='play' size={60} color="white" onPress={() => {
                            TrackPlayer.play()
                            setIsPlaying(true)
                        }} />
                    }
                </View>
                <Icon name='step-forward' size={30} color="white" onPress={() => TrackPlayer.skipToNext()} />
                <View>{
                    repeat ? <Icon name='retweet' size={30} color="white" onPress={() => setRepeat(!repeat)} /> : <Icon name='retweet' size={30} color="grey" onPress={() => setRepeat(!repeat)} />
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
        backgroundColor: "black",
        alignItems: "center",
    },
    time: {
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "black"
    },
    timeFont: {
        color: "white",
    }

})

export default Player