import RNFS from 'react-native-fs';
var musicFiles = []

export default getSongs = async ()=> {

    // Get the path to the music directory on the device
    const musicDir = RNFS.ExternalStorageDirectoryPath + '/Music';
    
    // Read the contents of the music directory
    RNFS.readDir(musicDir)
      .then((result) => {
        // Iterate through the files in the directory
        result.forEach((file) => {
          // Check if the file is a music file by checking its file extension
          if (file.name.endsWith('.mp3') || file.name.endsWith('.m4a')) {
            // If it's a music file, add it to the array
            // console.log(file.name)
            musicFiles.push(file.path);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
      console.log(musicFiles.length)
      return musicFiles;
    
    
}