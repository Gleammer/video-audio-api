class mediaState {
    _videoSource = {}
    _audioSource = {}
    _mediaNodeInstance = undefined

    constructor(videoSource = '', audioSource = ''){
        this._videoSource = videoSource
        this._audioSource = audioSource
    }
    
    /* Getters and setters */
    get videoSource(){
        return this._videoSource
    }
    
    set videoSource({videoSource, videoFormat}) {
        this._videoSource = {
            ...this._videoSource,
            videoSource,
            videoFormat
        }
    }
    
    get audioSource(){
        return this._audioSource
    }
    
    set audioSource({audioSource, audioFormat}) {
        this._audioSource = {
            ...this._audioSource,
            audioSource,
            audioFormat
        }
    }
    
    /* Create Media Node with video and audio */
    createMediaNode = () => {
        // Video Node
        let videoNode = document.createElement('video')
        videoNode.setAttribute('muted', '')
        // Source inside Video Node
        let videoSourceNode = document.createElement('source')
        videoSourceNode.setAttribute('src', this.videoSource)
        
        // Audio Node
        let audioNode = document.createElement('audio')
        // Source inside Audio Node
        let audioSourceNode = document.createElement('source')
        audioSourceNode.setAttribute('src', this.audioSource)
        
        audioNode.append(audioSourceNode)
        videoNode.append(videoSourceNode, audioNode)
        this._mediaNodeInstance = videoNode
    }
    
    serveMediaNode = () => {
        document.querySelector('#app .media-wrapper').appendChild(this._mediaNodeInstance)
    }

    deleteMediaNode = () => {
        delete this._mediaNodeInstance
    }
}

export default mediaState;