let ffmpeg = undefined
const getVideoBuffer = (video) => fetch('../static/videos/' + video).then(res => res.arrayBuffer()).catch(err => console.log(err))
const getAudioBuffer = (audio) => fetch('../static/audios/' + audio).then(res => res.arrayBuffer()).catch(err => console.log(err))

//importScripts('/src/js/ffmpeg-mp4.browser.js')

onmessage = (message) => {
    ({videoName, audioName} = message.data)
    console.log(`Video name: ${videoName}, Audio name: ${audioName};`)
    console.log(ffmpeg)
    //postMessage(createVideoAsync(videoName, audioName))
}

const createVideoAsync = async (videoName, audioName) => {
    let [videoBuffer, audioBuffer] = await Promise.all([getVideoBuffer(videoName), getAudioBuffer(audioName)]);
    let response = undefined
    console.log('Video buffer: ' + videoBuffer);
    console.log('Audio buffer: ' + audioBuffer);
    
    getNewVideo(videoBuffer,audioBuffer)
    .then(resBuffer => new Blob([resBuffer], {type: 'video/mp4'}))
    .then(blob => window.URL.createObjectURL(blob))
    .then(dataUri => response = dataUri)
    .catch(err => console.error(err))

    return response
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