import React, { useRef, useEffect } from 'react'
// @ts-ignore
import WaveSurfer from 'wavesurfer.js';
import { Recording } from '../models/types';

import audio from './audio.module.scss'

export default function Audio({ recording }: { recording: Recording }) {
    const waveformRef = useRef(null);

    useEffect(() => {
        if(waveformRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
            });
        }
    }, []);
    return (
        <div className={audio.container}>
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