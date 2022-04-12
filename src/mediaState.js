class mediaState {
    _videoSource = {}
    _audioSource = {}
    _wrapperNode = undefined
    _mediaNodeInstance = undefined
    
    constructor({wrapperNode = undefined, videoSource = {}, audioSource = {}}){
        this._videoSource = videoSource
        this._audioSource = audioSource
        this._wrapperNode = wrapperNode
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
        const videoNode = document.createElement('video')
        videoNode.src = this._videoSource._audioSource
        videoNode.muted = true
        videoNode.controls = true
        videoNode.load()

        console.log(videoNode.readyState)
        
        // Audio Node
        const audioNode = document.createElement('audio')
        audioNode.src = this._audioSource
        audioNode.controls = true
        audioNode.load()
        
        //videoNode.append(audioNode)
        this._mediaNodeInstance = document.createElement('div')
        this._mediaNodeInstance.append(videoNode, audioNode)
    }
    
    serveMediaNode = () => {
        document.querySelector('#app .media-wrapper').appendChild(this._mediaNodeInstance)
    }
    
    playPauseMedia = () => {
        this._mediaNodeInstance.play()
    }
    
    deleteMediaNode = () => {
        delete this._mediaNodeInstance
    }
}