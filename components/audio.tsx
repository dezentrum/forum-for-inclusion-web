import React from 'react'
import audio from './audio.module.scss'

export default function Audio({ recording }: { recording: any }) {
    return (
        <div className={audio.container}>
            <audio className={audio.player} preload="metadata" controls src={recording.path}></audio>
            <div className={audio.meta}>
                <ul className={audio.tags}>
                    {recording.tags?.map((tag: string) => {
                        <li className={audio.tagItem} key={tag}>{tag}</li>
                    })}
                </ul>
                <span className={audio.tagItem}>{recording.voting}</span>
            </div>
        </div>
    )
}