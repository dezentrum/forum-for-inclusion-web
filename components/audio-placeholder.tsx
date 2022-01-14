import audio from './audio-placeholder.module.scss'
import typo from  '../assets/styles/Typo.module.scss';

export const AudioPlaceholder =  () => {
    return (
        <div className={audio.wrap}>
            <div className={audio.container}>
                <div className={audio.waveform}></div>
                <div className={audio.tags}>
                    <div className={audio.tagList}>
                        <div className={audio.tagItem}></div>
                    </div>
                    <div className={audio.tagList}>
                        <div className={audio.tagItem}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}