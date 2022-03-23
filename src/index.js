import mediaState from "./mediaState"

// Get button controlls instances
const resumePauseButton = document.querySelector('#app button.video-resume-pause')
const stopButton = document.querySelector('#app button.video-stop')

const videoSourceList = [
    'video1',
    'video2'
]

const mediaInstance = new mediaState('src/videos/171124_C1_HD_012.mp4', 'src/audios/Kanye_West_-_I_Wonder_Extended_Int_(getmp3.pro).mp3')
/*
mediaInstance.videoSource({
    videoSource: 'src/videos/171124_C1_HD_012.mp4',
    videoFormat: 'video/mp4'
})
mediaInstance.audioSource({
    audioSource: 'src/audios/Kanye_West_-_I_Wonder_Extended_Int_(getmp3.pro).mp3', 
    audioFormat: 'audio/mpeg'
})
*/

mediaInstance.createMediaNode()
console.log(mediaInstance._mediaNodeInstance)


//mediaInstance.createMediaNode()


// Get video and audio player instances
const videoInstance = document.querySelector('#app video')
const audioInstance = document.querySelector('#app audio')

// Create Video media player and serve it to Front-End
const createMedia = ({video = '', audio = ''}) => {
    console.log(`${video} and ${audio}`);
}

resumePauseButton.addEventListener('click', (event) => {
    event.preventDefault()
    if(videoInstance.paused || audioInstance.paused){
        videoInstance.play()
        audioInstance.play()
    } else {
        videoInstance.pause()
        audioInstance.pause()
    }
})

stopButton.addEventListener('click', (event) => {
    event.preventDefault()
    videoInstance.pause()
    audioInstance.pause()
    videoInstance.currentTime = 0
    audioInstance.currentTime = 0
})