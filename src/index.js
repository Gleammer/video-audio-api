var $ = document.querySelector.bind(document)
var ffmpeg = window.ffmpeg

const getVideoBuffer = (video) => fetch('../static/videos/' + video).then(res => res.arrayBuffer()).catch(err => console.log(err))
const getAudioBuffer = (audio) => fetch('../static/audios/' + audio).then(res => res.arrayBuffer()).catch(err => console.log(err))

const videoList = [ 
    'video1.mp4',
    'video2.mp4',
    'video3.mp4',
    'video4.mp4',
    'video5.mp4',
    'video6.mp4',
    'video7.mp4',
    'video8.mp4',
    'video9.mp4',
    'video10.mp4',
    'video11.mp4',
    'video12.mp4'
]

const audioList = [
    'audio1.mp3',
    'audio2.mp3',
    'audio3.mp3',
    'audio4.mp3',
    'audio5.mp3',
    'audio6.mp3',
    'audio7.mp3',
    'audio8.mp3',
    'audio9.mp3',
    'audio10.mp3',
    'audio11.mp3',
    'audio12.mp3'
]

const setVideoSelect = () => {
    const videoSelect = $('#video-select')
    videoList.forEach(elem => {
        let option = document.createElement('option')
        option.text = elem
        option.value = elem
        videoSelect.appendChild(option)
    })
}

const setAudioSelect = () => {
    const audioSelect = $('#audio-select')
    audioList.forEach(elem => {
        let option = document.createElement('option')
        option.text = elem
        option.value = elem
        audioSelect.appendChild(option)
    })
}

const serveVideo = (dataUri) => {
    const video = $('#mp4')
    video.src = dataUri
}

const createVideoAsync = async (videoName, audioName) => {
    let [videoBuffer, audioBuffer] = await Promise.all([getVideoBuffer(videoName), getAudioBuffer(audioName)]);
    console.log('Video buffer: ' + videoBuffer);
    console.log('Audio buffer: ' + audioBuffer);
    
    getNewVideo(videoBuffer,audioBuffer)
        .then(resBuffer => new Blob([resBuffer], {type: 'video/mp4'}))
        .then(blob => window.URL.createObjectURL(blob))
        .then(dataUri => { serveVideo(dataUri) })
        .catch(err => console.error(err))
}

const getNewVideo = (videoBuffer, audioBuffer) => {
    return new Promise((resolve, reject) => {
        // Create video
        try{
            var result = ffmpeg({
                MEMFS: [
                    {name: "video.mp4", data: videoBuffer},
                    {name: "audio.wav", data: audioBuffer}
                ],
                arguments: ["-i", "video.mp4", "-i", "audio.wav", "-c:v", "copy", "-c:a", "aac", "output.mp4"],
                
                // Ignore stdin read requests.
                stdin: function() {},
            });
            // Write out.gif to disk.
            var out = result.MEMFS[0];
            if (!out) {
                throw new Error('Could not convert video')
            }
            resolve(Uint8Array.from(out.data))
        } catch(err) {
            reject(err)
        }
    })   
}


const createVideo = () => {
    const videoOption = $('#video-select').value
    const audioOption = $('#audio-select').value
    
    console.log(`Create video using video: ${videoOption} and audio: ${audioOption}`)
    createVideoAsync(videoOption, audioOption)
}

const initialSetUp = () => {
    setVideoSelect()
    setAudioSelect()
    $('#create-video').addEventListener('click', createVideo)
    //createVideo()
}

initialSetUp()