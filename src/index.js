//import mediaState from "./mediaState"

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
}

// -- Create a MediaSource and attach it to the video (We already learned about that) --
const videoTag = document.querySelector('#app video');


// Listen to Play, Pause and Stop buttons
resumePauseButton.addEventListener('click', (event) => {
    event.preventDefault()
    videoTag.src = "./static/videos/video2.mp4"
    videoTag.load()
})

stopButton.addEventListener('click', (event) => {
    event.preventDefault()
    
})