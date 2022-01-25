import React, { useRef, useEffect, useState } from "react";
import { Recording } from "../models/types";
// @ts-ignore
import WaveSurfer from "wavesurfer.js";

import audio from "./audio.module.scss";
import container from "../assets/styles/Container.module.scss"

export default function Audio({ recordings }: { recordings: Recording[] }) {
  const waveformRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any | undefined>(undefined);
  const [selectedRecording, setSelectedRecording] = useState<Recording>(recordings[0]);

  useEffect(() => {
    setSelectedRecording(recordings[0])
  }, [recordings])

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        height: 64,
        barWidth: 3,
        barHeight: 0.2,
        barMinHeight: 10,
        barRadius: 3,
        barGap: 3,
        normalize: true,
        progressColor: 'rgba(0, 0, 0, 0.6)',
        waveColor: 'rgba(44, 43, 36, 0.4)',
        cursorColor: 'transparent',
        cursorWidth: 0,
        responsive: true,
        interact: false
      });
      setWavesurfer(wavesurfer);
    }
  }, []);

  const findCurrentIndex = () => {
    return recordings.findIndex((recording) => recording.path === selectedRecording.path)
  }

  const skipToNextRecording = () => {
    wavesurfer.un('finish', skipToNextRecording)
    if (recordings[findCurrentIndex() + 1]) {
      setSelectedRecording(recordings[findCurrentIndex() + 1])
    } else {
      setSelectedRecording(recordings[0])
    }
  }

  useEffect(() => {
    if (wavesurfer) {
      if (selectedRecording.path) {
        wavesurfer.load(selectedRecording.path);

        wavesurfer.on('ready', () => {
          wavesurfer.play()
          wavesurfer.on('finish', skipToNextRecording)
        })
      }
    }
  }, [selectedRecording, wavesurfer]);


  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <div className={audio.container}>
        <div className={audio.player} onClick={togglePlay}>
          <div ref={waveformRef} className={audio.playerWaveform}></div>
        </div>
        <div className={audio.meta}>
          <ul className={audio.tags}>
            {selectedRecording.tags?.map((tag: string) => {
              <li className={audio.tagItem} key={tag}>
                {tag}
              </li>;
            })}
          </ul>
          <span className={audio.tagItem}>{selectedRecording.voting}</span>
        </div>
      </div>
      <div className={audio.playerButtons}>
        <button className={audio.playerButtonForward} onClick={() => skipToNextRecording()}></button>
      </div>
    </div>
  );
}
