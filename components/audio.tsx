import React, { useRef, useEffect } from 'react'
import { Recording } from '../models/types';
// @ts-ignore
import WaveSurfer from 'wavesurfer.js'


import audio from './audio.module.scss'

import { Waveform } from './waveform'

export default function Audio({ recording }: { recording: Recording }) {
    const waveformRef = useRef(null);

    useEffect(() => {
        if(waveformRef.current) {
            console.log(WaveSurfer.create)
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
            });
        }
    }, []);

    return (
        <div className={audio.container}>
            <Waveform />
            <audio className={audio.player} preload="metadata" controls src={recording.path}></audio>
            <div className={audio.meta}>
            <div ref={waveformRef}></div>
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