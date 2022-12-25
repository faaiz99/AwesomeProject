import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import SoundPlayer from 'react-native-sound-player'
import Slider from '@react-native-community/slider';
import { VolumeManager } from 'react-native-volume-manager';





const Player = () => {
    const [playing, setPlaying] = useState(false)
    const [songDuration, setSongDuration] = useState(0)
    const [songLength, setSongLength] = useState(0)
    const [repeat, setRepeat] = useState(false)
    const [random, setRandom] = useState(false)

    async function play() {
        try {
            const reference = storage().ref('Kesariya - Brahmastra 128 Kbps.mp3');

            var path = await reference.getDownloadURL()
            SoundPlayer.loadUrl(path)
            var time = await SoundPlayer.getInfo()
            console.log(time.currentTime)
            setSongLength(Math.floor(time.duration / 60))
            setPlaying(true)

            SoundPlayer.play()
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }
    const pause = async () => {
        try {
            setPlaying(false)
            SoundPlayer.pause()

        } catch (e) {
            console.log(e)
        }
    }
    const resume = async () => {
        setPlaying(true)
        SoundPlayer.resume()

    }
    useEffect(() => {

        //play()
        const songStartInterval = setInterval(() => {
            setSongDuration((t) => t + 0.1);
        }, 1000);
        return () => {
            clearInterval(songStartInterval);
        };
    }, [])

    return (<>
        <View>
            <Text>{songDuration}</Text>
            <Text>{playing} Hello</Text>
            <Slider
                style={{ height: 40, backgroundColor: "black" }}
                minimumValue={0}
                maximumValue={songLength}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="white"
                thumbTintColor="white"
                value={songDuration}
                onValueChange={async (e) => {
                    setSongDuration(e)
                    SoundPlayer.seek(songDuration * 60)
                    console.log(await SoundPlayer.getInfo())
                    setPlaying(true)
                }}
            />
        </View>
        <View style={styles.controls}>
            <View>{
                random?      <Icon name='random' size={30} color="white" onPress={()=>setRandom(!random)} />: <Icon name='random' size={30} color="grey" onPress={()=>setRandom(!random)} />
            }
            </View>
       
            <Icon name='step-backward' size={30} color="white" onPress={{}} />
            <View>
                {
                    playing ? <Icon name='pause' size={60} color="white" onPress={pause} /> : <Icon name='play' size={60} color="white" onPress={resume} />
                }
            </View>
            <Icon name='step-forward' size={30} color="white" onPress={{}} />
            <View>{
                repeat ? <Icon name='retweet' size={30} color="white" onPress={()=>setRepeat(!repeat)} /> : <Icon name='retweet' size={30} color="grey" onPress={()=>setRepeat(!repeat)} />
            }
            </View>

        </View>
    </>
    )
}
const styles = StyleSheet.create({
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "black",
        alignItems: "center",

    },

})

export default Player