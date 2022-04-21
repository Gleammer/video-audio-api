var $ = document.querySelector.bind(document)

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

const getVideoArray = (response) => {
    return new Promise((resolve, reject) => {
        try{
            if(!response){
                throw new Error('Could not convert video')
            }
            resolve(Uint8Array.from(response.data))
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
const serveVideo = (dataUri) => {
    $('#mp4').src = dataUri
}

const workerReady = () => {
    ffmpegWorker.postMessage({type: "run", arguments: ["-version"]});
}
const workerStdout = (data) => {
    console.log(data)
}
const workerStderr = (data) => {
    console.log(data)
}
const workerDone = (res) => {
    if(res.MEMFS.length){
        console.log('FFMpeg Worker done: video created')
        
        getVideoArray(res.MEMFS[0])
            .then(resBuffer => new Blob([resBuffer], {type: 'video/mp4'}))
            .then(blob => window.URL.createObjectURL(blob))
            .then(dataUri => serveVideo(dataUri))
            .catch(err => console.error(err))
    } else {
        console.log('FFMpeg Worker done: no output file found')
    }
}

// Add FFMpeg worker actio dispatcher
const ffmpegWorker = new Worker("/src/js/ffmpeg-worker-mp4.browser.js");
ffmpegWorker.onmessage = function(e) {
    const msg = e.data;
    switch (msg.type) {
        case "ready":
        workerReady()
        break;
        case "stdout":
        workerStdout(msg.data)
        break;
        case "stderr":
        workerStderr(msg.data)
        break;
        case "done":
        workerDone(msg.data)
        break;
    }
};

const createVideoAsync = async (videoName, audioName) => {
    let [videoBuffer, audioBuffer] = await Promise.all([getVideoBuffer(videoName), getAudioBuffer(audioName)]);
    console.log('Video buffer: ' + videoBuffer);
    console.log('Audio buffer: ' + audioBuffer);
    
    // postMessage to FFMpeg worker to work async on the video
    ffmpegWorker.postMessage({
        type: "run",
        MEMFS: [
            {name: "video.mp4", data: videoBuffer},
            {name: "audio.wav", data: audioBuffer}
        ],
        arguments: ["-loglevel", "error", "-i", "video.mp4", "-i", "audio.wav", "-c:v", "copy", "-c:a", "aac", "output.mp4"]
    });
}

// Fires when clicking create video button
const createVideo = () => {
    const videoOption = $('#video-select').value
    const audioOption = $('#audio-select').value
    
    console.log(`Starting Web Worker`)
    createVideoAsync(videoOption, audioOption)
    //worker.postMessage({videoName: videoOption, audioName: audioOption})
}

const initialSetUp = () => {
    setVideoSelect()
    setAudioSelect()
    $('#create-video').addEventListener('click', createVideo)
}

initialSetUp()