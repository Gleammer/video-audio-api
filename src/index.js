var $ = document.querySelector.bind(document)
var ffmpeg = window.ffmpeg

const getVideoBuffer = () => fetch('../static/videos/video.mp4').then(res => res.arrayBuffer()).catch(err => console.log(err))
const getAudioBuffer = () => fetch('../static/audios/audio.mp3').then(res => res.arrayBuffer()).catch(err => console.log(err))



const createVideo = async () => {
    let [videoBuffer, audioBuffer] = await Promise.all([getVideoBuffer(), getAudioBuffer()]);
    console.log('Video buffer: ' + videoBuffer);
    console.log('Audio buffer: ' + audioBuffer);
    const resBuffer = getNewVideo(videoBuffer, audioBuffer)
    console.log('Got new Video buffer')
    const blob = new Blob([resBuffer], {type: 'video/mp4'})
    const dataUri = window.URL.createObjectURL(blob)
    
    const video = $('#mp4')
    video.src = dataUri
}

function getNewVideo(videoBuffer, audioBuffer) {
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
    return Uint8Array.from(out.data)
}

console.log('test')
createVideo()