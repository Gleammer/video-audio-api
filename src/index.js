// Get button controlls instances
const resumePauseButton = document.querySelector('#app button.video-resume-pause')
const stopButton = document.querySelector('#app button.video-stop')

const sourceList = {
    videoSourceList: [
        'video1',
        'video2'
    ],
    audioSourceList: [
        'audio1',
        'audio2'
    ]
} // for future -- to be imported from json

// Select media wrapper
/*
const videoTag = document.querySelector('#app .media-wrapper');
const mediaNode = new mediaState({
    wrapperNode: videoTag,
    videoSource: {},
    audioSource: {}
});
*/

let player = videojs("video-entity", {
    controls: true,
    autoplay: false,
    preload: 'auto',
    sources: [
        {
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4'
        }
    ]
}, (event) => {
    console.log(event)
    console.log('Player ready')
})

// Create a track object.
var track = new videojs.AudioTrack({
    id: 'custom-audio-track',
    kind: 'main',
    label: 'CustomAudio',
    language: 'en'
});

var track2 = new videojs.AudioTrack({
    id: 'custom-audio-track-2',
    kind: 'translation',
    label: 'CustomAudio2',
    language: 'en'
});

// Add the track to the player's audio track list.
player.audioTracks().addTrack(track);
player.audioTracks().addTrack(track2);

console.log(player.audioTracks())

// Listen to Play, Pause and Stop buttons
resumePauseButton.addEventListener('click', (event) => {
    event.preventDefault()
    videoTag.src = "./static/videos/video2.mp4"
    videoTag.load()
})

stopButton.addEventListener('click', (event) => {
    event.preventDefault()
    
})

// Testing buttons
let select_video = (index) => {
    console.log(index)
}
let select_audio = (index) => {
    console.log(index)
}