// Get button controlls instances
const resumePauseButton = document.querySelector('#app button.video-resume-pause')
const stopButton = document.querySelector('#app button.video-stop')

// Get video and audio player instances
const videoInstance = document.querySelector('#app video')
const audioInstance = document.querySelector('#app audio')

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
