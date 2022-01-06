import React, { useRef, useEffect, useState } from "react";
import { Recording } from "../models/types";
// @ts-ignore
import WaveSurfer from "wavesurfer.js";

import audio from "./audio.module.scss";

export default function Audio({ recording, index }: { recording: Recording, index: number }) {
  const waveformRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        height: 44,
        barWidth: 3,
        barHeight: 0.2,
        barMinHeight: 10,
        barRadius: 3,
        barGap: 2,
        normalize: true,
        progressColor: 'rgba(0, 0, 0, 0.6)',
        waveColor: 'rgba(44, 43, 36, 0.4)',
        cursorColor: 'transparent',
        cursorWidth: 0,
        responsive: true,
        interact: false
      });
      wavesurfer.load(recording.path);
      setWavesurfer(wavesurfer);
      wavesurfer.on('finish', () => {
        console.log('finished')
      })
    }
  }, [recording.path]);


  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div className={audio.container} style={{zIndex: -1 * index}}>
      <div className={audio.player} onClick={togglePlay}>
        <div ref={waveformRef} className={audio.playerWaveform}></div>
      </div>
      <div className={audio.meta}>
        <ul className={audio.tags}>
          {recording.tags?.map((tag: string) => {
            <li className={audio.tagItem} key={tag}>
              {tag}
            </li>;
          })}
        </ul>
        <span className={audio.tagItem}>{recording.voting}</span>
      </div>
    </div>
  );
}
